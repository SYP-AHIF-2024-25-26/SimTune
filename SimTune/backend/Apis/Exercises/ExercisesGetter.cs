using backend.DataAccess;
using backend.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Apis.Exercises;

public static class ExercisesGetter
{
    public static async Task<IResult> GetExercises([FromRoute] ExerciseType exerciseType, SimTuneDbContext context)
    {
        if (!Enum.IsDefined(typeof(ExerciseType), exerciseType))
        {
            return Results.BadRequest("Invalid exercise type");
        }
        
        var exercises = await context.Exercises
            .Where(exercise => exercise.ExerciseType == exerciseType)
            .ToListAsync();
        
        return Results.Ok(exercises);
    }
}