using System.Globalization;
using backend.DataAccess;
using backend.Database;
using CsvHelper;
using Microsoft.EntityFrameworkCore;

public static class ImportCsv
{
    public static void ImportExerciseContents(string csvPath, SimTuneDbContext context)
    {
        using var reader = new StreamReader(csvPath);
        using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
        var records = csv.GetRecords<ExerciseContentCsv>().ToList();

        foreach (var record in records)
        {
            var exercise = context.Exercises
                .Include(e => e.ExerciseContents)
                .FirstOrDefault(e => e.Id == record.ExerciseId);
                
            if (exercise != null)
            {
                // Prüfe, ob dieser Content bereits existiert
                bool contentExists = exercise.ExerciseContents.Any(ec => 
                    ec.CorrectAnswer == record.CorrectAnswer && 
                    ec.Instruction == record.Instruction
                );

                if (!contentExists)
                {
                    var content = new ExerciseContent
                    {
                        Instruction = record.Instruction,
                        NotesToRead = record.NotesToRead,
                        AllAnswers = record.AllAnswers,
                        PossibleAnswers = record.PossibleAnswers,
                        CorrectAnswer = record.CorrectAnswer,
                        Exercise = exercise
                    };
                    exercise.ExerciseContents.Add(content);
                }
            }
        }
        context.SaveChanges();
    }
}

public class ExerciseContentCsv
{
    public int ExerciseId { get; set; }
    public int ContentId { get; set; }
    public string Instruction { get; set; }
    public string NotesToRead { get; set; }
    public string AllAnswers { get; set; }
    public string PossibleAnswers { get; set; }
    public string CorrectAnswer { get; set; }
}