using Microsoft.AspNetCore.Mvc;

namespace backend.Apis.Exercises;

public static partial class ExercisesApi
{
    public static IEndpointRouteBuilder MapExercisesApi(this IEndpointRouteBuilder app)
    {
        app.MapGet("/exercises/{exerciseType}", ExercisesGetter.GetExercises)
            .WithName(nameof(ExercisesGetter.GetExercises))
            .WithDescription("Gets the exercises of a type")
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<int>(StatusCodes.Status200OK);

        app.MapGet("/exercises/{exerciseId:int}", ExercisesGetter.GetExerciseById)
            .WithName(nameof(ExercisesGetter.GetExerciseById))
            .WithDescription("Gets an exercise by its ID")
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<ProblemDetails>(StatusCodes.Status404NotFound)
            .Produces<int>(StatusCodes.Status200OK);

        app.MapGet("/exercises/count-by-allocation", ExerciseAllocationCounter.GetExerciseCountsByAllocation)
            .WithName(nameof(ExerciseAllocationCounter.GetExerciseCountsByAllocation))
            .WithDescription("Gets the count of exercises by allocation types")
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<ExerciseAllocationCountResponseDto>(StatusCodes.Status200OK);

        return app;
    }
}