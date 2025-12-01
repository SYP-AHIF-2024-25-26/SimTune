using backend.Apis.ExamSimulation;
using Microsoft.AspNetCore.Mvc;

public static partial class ExamSimulationApi
{
    public static IEndpointRouteBuilder MapExamSimulationApi(this IEndpointRouteBuilder app)
    {
        app.MapGet("exam-simulation/exercises", ExamSimulationExercisesGetter.GetExamSimulationExercises)
            .WithName(nameof(ExamSimulationExercisesGetter.GetExamSimulationExercises))
            .WithDescription("Gets all exam simulation exercises with filtering options")
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<ExamSimulationResponseDto>(StatusCodes.Status200OK);

        app.MapPost("exam-simulation/completed", UserExamSimulationService.StoreCompletedExamSimulation)
            .WithName(nameof(UserExamSimulationService.StoreCompletedExamSimulation))
            .WithDescription("Stores a completed exam simulation for the logged-in user")
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status200OK)
            .RequireAuthorization();

        app.MapGet("exam-simulation/completed", UserExamSimulationService.GetCompletedExamSimulations)
            .WithName(nameof(UserExamSimulationService.GetCompletedExamSimulations))
            .WithDescription("Gets all completed exam simulations for the logged-in user with statistics")
            .Produces<UserExamSimulationSummaryDto>(StatusCodes.Status200OK)
            .RequireAuthorization();

        return app;
    }
}