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

        return app;
    }
}