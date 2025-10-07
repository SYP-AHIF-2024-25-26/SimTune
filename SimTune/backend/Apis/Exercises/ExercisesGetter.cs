using backend.DataAccess;
using backend.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Apis.Exercises;

public static class ExercisesGetter
{
    public static async Task<IResult> GetExercises([FromRoute] string exerciseType, SimTuneDbContext context)
    {
        if (!Enum.TryParse<ExerciseType>(exerciseType, true, out var parsedExerciseType))
        {
            return Results.BadRequest($"Invalid exercise type: '{exerciseType}'. Valid values are: {string.Join(", ", Enum.GetNames<ExerciseType>())}");
        }
        
        var exercises = await context.Exercises
            .Where(exercise => exercise.ExerciseType == parsedExerciseType)
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