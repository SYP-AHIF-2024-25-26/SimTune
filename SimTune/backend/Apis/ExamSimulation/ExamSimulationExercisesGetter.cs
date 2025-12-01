using backend.DataAccess;
using backend.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Apis.ExamSimulation;

public static class ExamSimulationExercisesGetter
{
    public static async Task<IResult> GetExamSimulationExercises(
        [FromQuery] int questionCount,
        [FromQuery] string exerciseAllocations,
        SimTuneDbContext context)
    {
        // Validierung
        if (questionCount <= 0)
        {
            return Results.BadRequest("QuestionCount muss größer als 0 sein.");
        }

        // Parse comma-separated string to list
        var allocationsList = exerciseAllocations
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .ToList();

        if (!allocationsList.Any())
        {
            return Results.BadRequest("Mindestens eine Prüfungsart muss ausgewählt werden.");
        }

        // Hole alle Übungen mit ExerciseContents
        var allExercises = await context.Exercises
            .Include(e => e.ExerciseContents)
            .Where(e => e.ExerciseContents.Any())
            .ToListAsync();

        // Filtere Übungen nach gewünschten Prüfungsarten
        var filteredExercises = allExercises
            .Where(e => allocationsList.Contains(GetExerciseAllocation(e.ExerciseType.ToString())))
            .ToList();

        if (!filteredExercises.Any())
        {
            return Results.BadRequest("Keine Übungen für die ausgewählten Prüfungsarten gefunden.");
        }

        // Generiere zufällige Fragen
        var random = new Random();
        var selectedQuestions = new List<ExamQuestionDto>();
        int questionNumber = 1;

        for (int i = 0; i < questionCount; i++)
        {
            // Wähle zufällige Übung
            var exercise = filteredExercises[random.Next(filteredExercises.Count)];
            
            // Füge ALLE Contents dieser Übung hinzu
            foreach (var content in exercise.ExerciseContents)
            {
                selectedQuestions.Add(new ExamQuestionDto
                {
                    ExerciseId = exercise.Id,
                    ContentId = content.Id,
                    Description = exercise.Description,
                    ExerciseType = exercise.ExerciseType.ToString(),
                    ExerciseAllocation = GetExerciseAllocation(exercise.ExerciseType.ToString()),
                    Instruction = content.Instruction,
                    NotesToRead = content.NotesToRead,
                    AllAnswers = content.AllAnswers,
                    PossibleAnswers = content.PossibleAnswers,
                    CorrectAnswer = content.CorrectAnswer,
                    QuestionNumber = questionNumber++
                });
            }
        }

        return Results.Ok(new ExamSimulationResponseDto
        {
            TotalQuestions = selectedQuestions.Count,
            Questions = selectedQuestions
        });
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

public class ExamSimulationRequestDto
{
    public int QuestionCount { get; set; }
    public List<string> ExerciseAllocations { get; set; } = new();
}

public class ExamSimulationResponseDto
{
    public int TotalQuestions { get; set; }
    public List<ExamQuestionDto> Questions { get; set; } = new();
}

public class ExamQuestionDto
{
    public int ExerciseId { get; set; }
    public int ContentId { get; set; }
    public string Description { get; set; } = string.Empty;
    public string ExerciseType { get; set; } = string.Empty;
    public string ExerciseAllocation { get; set; } = string.Empty;
    public string Instruction { get; set; } = string.Empty;
    public string NotesToRead { get; set; } = string.Empty;
    public string AllAnswers { get; set; } = string.Empty;
    public string PossibleAnswers { get; set; } = string.Empty;
    public string CorrectAnswer { get; set; } = string.Empty;
    public int QuestionNumber { get; set; }
}
