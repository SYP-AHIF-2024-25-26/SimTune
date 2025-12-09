using backend.DataAccess;
using backend.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Apis.Exercises;

public static class ExerciseAllocationCounter
{
    public static async Task<IResult> GetExerciseCountsByAllocation(
        [FromQuery] string exerciseAllocations,
        SimTuneDbContext context)
    {
        // Parse comma-separated string to list
        var allocationsList = exerciseAllocations
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .ToList();

        if (!allocationsList.Any())
        {
            return Results.BadRequest("Mindestens eine Prüfungsart muss ausgewählt werden.");
        }

        // Hole alle Übungen
        var allExercises = await context.Exercises.ToListAsync();

        // Zähle alle Exercises, die zu den mitgeschickten ExerciseAllocations gehören
        var totalExerciseCount = allExercises
            .Count(e => allocationsList.Contains(GetExerciseAllocation(e.ExerciseType.ToString())));

        return Results.Ok(new ExerciseAllocationCountResponseDto { ExerciseCount = totalExerciseCount });
    }

    private static string GetExerciseAllocation(string exerciseType)
    {
        if (exerciseType.Contains("Stammtoene", StringComparison.OrdinalIgnoreCase)
            || exerciseType.Contains("Violin", StringComparison.OrdinalIgnoreCase)
            || exerciseType.Contains("Bass", StringComparison.OrdinalIgnoreCase))
            return "Töne";
        if (exerciseType.Contains("Intervall", StringComparison.OrdinalIgnoreCase))
            return "Intervalle";
        if (exerciseType.Contains("Tonleiter", StringComparison.OrdinalIgnoreCase))
            return "Tonleitern";
        if (exerciseType.Contains("Rhythmus", StringComparison.OrdinalIgnoreCase))
            return "Rhythmus";
        if (exerciseType.Contains("Akkord", StringComparison.OrdinalIgnoreCase))
            return "Akkorde";
        if (exerciseType.Contains("Tonart", StringComparison.OrdinalIgnoreCase))
            return "Tonarten";
        
        return "Sonstiges";
    }
}

public class ExerciseAllocationCountResponseDto
{
    public int ExerciseCount { get; set; }
}
