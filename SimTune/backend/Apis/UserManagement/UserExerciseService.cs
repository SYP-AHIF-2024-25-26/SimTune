using System.Security.Claims;
using backend.DataAccess;
using backend.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Apis.UserManagement;

public class UserExerciseService
{
    [Authorize]
    public static async Task<IResult> GetCompletedUserExercises(SimTuneDbContext context, HttpContext httpContext)
    {
        // Get user ID from claims
        var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            return Results.Unauthorized();
        }

        // Get all completed exercises for the user
        var userExercises = await context.UserExercises
            .Where(ue => ue.UserId == userId)
            .Include(ue => ue.Exercise)
            .Select(ue => new UserExerciseDto
            {
                ExerciseId = ue.ExerciseId,
                Description = ue.Exercise.Description,
                ExerciseType = ue.Exercise.ExerciseType.ToString(),
                ExerciseAllocation = GetExerciseAllocation(ue.Exercise.ExerciseType.ToString()),
                HighestScore = ue.HighestScore,
                Attempts = ue.Attempts
            })
            .ToListAsync();

        // Return the raw values
        return Results.Ok(userExercises);
    }

    private static string GetExerciseAllocation(string exerciseType)
    {
        if (exerciseType.Contains("Stammtoene", StringComparison.OrdinalIgnoreCase))
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

    [Authorize]
    public static async Task<IResult> StoreCompletedUserExercise(
        [FromBody] StoreCompletedUserExerciseDto userExerciseDto, SimTuneDbContext context, HttpContext httpContext)
    {
        // 1. Get user ID from claims
        var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            return Results.Unauthorized();
        }

        // 2. Check if exercise exists
        var exerciseExists = await context.Exercises
            .AnyAsync(e => e.Id == userExerciseDto.ExerciseId);

        if (!exerciseExists)
        {
            return Results.BadRequest("Exercise not found");
        }

        // 3. Find or create user exercise record
        var userExercise = await context.UserExercises
            .FirstOrDefaultAsync(ue => ue.UserId == userId && ue.ExerciseId == userExerciseDto.ExerciseId);

        if (userExercise == null)
        {
            // Create new record if doesn't exist
            userExercise = new UserExercise
            {
                UserId = userId,
                ExerciseId = userExerciseDto.ExerciseId,
                HighestScore = userExerciseDto.Score,
                Attempts = 1
            };
            context.UserExercises.Add(userExercise);
        }
        else
        {
            // Update existing record
            if (userExerciseDto.Score > userExercise.HighestScore)
            {
                userExercise.HighestScore = userExerciseDto.Score;
            }

            userExercise.Attempts++;
        }

        // 4. Save changes
        await context.SaveChangesAsync();

        // 5. Return success
        return Results.Ok(new
        {
            Message = "Exercise result saved successfully",
            HighestScore = userExercise.HighestScore,
            Attempts = userExercise.Attempts
        });
    }

    public class UserExerciseDto
    {
        public int ExerciseId { get; set; }
        public string Description { get; set; } = string.Empty;
        public string ExerciseType { get; set; } = string.Empty;
        public string ExerciseAllocation { get; set; } = string.Empty;
        public double HighestScore { get; set; }
        public int Attempts { get; set; }
    }

    public class StoreCompletedUserExerciseDto
    {
        public int ExerciseId { get; set; }
        public double Score { get; set; }
    }
}