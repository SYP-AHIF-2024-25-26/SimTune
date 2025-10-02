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
            .Select(e => new ExerciseDto
            {
                Id = e.Id,
                Description = e.Description,
                NotationType = e.NotationType.ToString(),
                ExerciseType = e.ExerciseType.ToString(),
                ExerciseModus = e.ExerciseModus.ToString(),
                ExerciseContents = context.ExerciseContents
                    .Where(ec => ec.ExerciseId == e.Id)
                    .Select(ec => new ExerciseContentDto
                    {
                        Id = ec.Id,
                        Instruction = ec.Instruction,
                        NotesToRead = ec.NotesToRead,
                        AllAnswers = ec.AllAnswers,
                        PossibleAnswers = ec.PossibleAnswers,
                        CorrectAnswer = ec.CorrectAnswer
                    }).ToList()
            })
            .ToListAsync();

        return Results.Ok(exercises);
    }
}