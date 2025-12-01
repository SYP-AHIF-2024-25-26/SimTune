using System.Security.Claims;
using backend.DataAccess;
using backend.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Apis.ExamSimulation;

public class UserExamSimulationService
{
    [Authorize]
    public static async Task<IResult> StoreCompletedExamSimulation(
        [FromBody] StoreExamSimulationDto dto,
        SimTuneDbContext context,
        HttpContext httpContext)
    {
        // Get user ID from claims
        var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            return Results.Unauthorized();
        }

        // Validierung
        if (dto.QuestionCount <= 0)
        {
            return Results.BadRequest("QuestionCount muss größer als 0 sein.");
        }

        if (dto.ExerciseAllocations == null || !dto.ExerciseAllocations.Any())
        {
            return Results.BadRequest("Mindestens eine Prüfungsart muss ausgewählt werden.");
        }

        if (dto.AchievedPercentage < 0 || dto.AchievedPercentage > 100)
        {
            return Results.BadRequest("AchievedPercentage muss zwischen 0 und 100 liegen.");
        }

        // Erstelle neuen Eintrag
        var userExamSimulation = new UserExamSimulation
        {
            UserId = userId,
            QuestionCount = dto.QuestionCount,
            ExerciseAllocations = string.Join(",", dto.ExerciseAllocations),
            AchievedPercentage = dto.AchievedPercentage,
            CompletedAt = DateTime.UtcNow
        };

        context.UserExamSimulations.Add(userExamSimulation);
        await context.SaveChangesAsync();

        return Results.Ok(new
        {
            Message = "Prüfungssimulation erfolgreich gespeichert",
            Id = userExamSimulation.Id,
            AchievedPercentage = userExamSimulation.AchievedPercentage,
            CompletedAt = userExamSimulation.CompletedAt
        });
    }

    [Authorize]
    public static async Task<IResult> GetCompletedExamSimulations(
        SimTuneDbContext context,
        HttpContext httpContext)
    {
        // Get user ID from claims
        var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
        {
            return Results.Unauthorized();
        }

        // Hole alle abgeschlossenen Prüfungssimulationen
        var examSimulations = await context.UserExamSimulations
            .Where(ues => ues.UserId == userId)
            .OrderByDescending(ues => ues.CompletedAt)
            .ToListAsync();

        if (!examSimulations.Any())
        {
            return Results.Ok(new UserExamSimulationSummaryDto
            {
                BestExamPercentage = 0,
                WorstExamPercentage = 0,
                AveragePercentage = 0,
                TotalExamsCompleted = 0,
                Last5Exams = new List<UserExamSimulationDto>(),
                AllExams = new List<UserExamSimulationDto>()
            });
        }

        // Berechne Statistiken
        var bestExam = examSimulations.Max(e => e.AchievedPercentage);
        var worstExam = examSimulations.Min(e => e.AchievedPercentage);
        var averagePercentage = examSimulations.Average(e => e.AchievedPercentage);
        var totalExams = examSimulations.Count;

        // Die letzten 5 Prüfungen für das Balkendiagramm
        var last5Exams = examSimulations
            .Take(5)
            .Select(ues => new UserExamSimulationDto
            {
                Id = ues.Id,
                QuestionCount = ues.QuestionCount,
                ExerciseAllocations = ues.ExerciseAllocations.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList(),
                AchievedPercentage = ues.AchievedPercentage,
                CompletedAt = ues.CompletedAt
            })
            .ToList();

        // Alle Prüfungen
        var allExams = examSimulations
            .Select(ues => new UserExamSimulationDto
            {
                Id = ues.Id,
                QuestionCount = ues.QuestionCount,
                ExerciseAllocations = ues.ExerciseAllocations.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList(),
                AchievedPercentage = ues.AchievedPercentage,
                CompletedAt = ues.CompletedAt
            })
            .ToList();

        return Results.Ok(new UserExamSimulationSummaryDto
        {
            BestExamPercentage = bestExam,
            WorstExamPercentage = worstExam,
            AveragePercentage = Math.Round(averagePercentage, 2),
            TotalExamsCompleted = totalExams,
            Last5Exams = last5Exams,
            AllExams = allExams
        });
    }
}

public class StoreExamSimulationDto
{
    public int QuestionCount { get; set; }
    public List<string> ExerciseAllocations { get; set; } = new();
    public double AchievedPercentage { get; set; }
}

public class UserExamSimulationDto
{
    public int Id { get; set; }
    public int QuestionCount { get; set; }
    public List<string> ExerciseAllocations { get; set; } = new();
    public double AchievedPercentage { get; set; }
    public DateTime CompletedAt { get; set; }
}

public class UserExamSimulationSummaryDto
{
    public double BestExamPercentage { get; set; }
    public double WorstExamPercentage { get; set; }
    public double AveragePercentage { get; set; }
    public int TotalExamsCompleted { get; set; }
    public List<UserExamSimulationDto> Last5Exams { get; set; } = new();
    public List<UserExamSimulationDto> AllExams { get; set; } = new();
}
