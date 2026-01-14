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

        // Lade alle Exercises in ein Dictionary basierend auf dem Key
        var exercisesByKey = context.Exercises
            .Include(e => e.ExerciseContents)
            .ToDictionary(e => e.Key, e => e);

        foreach (var record in records)
        {
            if (exercisesByKey.TryGetValue(record.ExerciseKey, out var exercise))
            {
                // Prüfe, ob dieser Content bereits existiert (basierend auf ContentId oder CorrectAnswer + Instruction)
                var existingContent = exercise.ExerciseContents.FirstOrDefault(ec => 
                    ec.CorrectAnswer == record.CorrectAnswer && 
                    ec.Instruction == record.Instruction
                );

                if (existingContent != null)
                {
                    // Update existing content - prüfe ALLE Eigenschaften
                    bool hasChanged = false;
                    
                    if (existingContent.Instruction != record.Instruction)
                    {
                        existingContent.Instruction = record.Instruction;
                        hasChanged = true;
                    }
                    
                    if (existingContent.NotesToRead != record.NotesToRead)
                    {
                        existingContent.NotesToRead = record.NotesToRead;
                        hasChanged = true;
                    }
                    
                    if (existingContent.AllAnswers != record.AllAnswers)
                    {
                        existingContent.AllAnswers = record.AllAnswers;
                        hasChanged = true;
                    }
                    
                    if (existingContent.PossibleAnswers != record.PossibleAnswers)
                    {
                        existingContent.PossibleAnswers = record.PossibleAnswers;
                        hasChanged = true;
                    }
                    
                    if (existingContent.CorrectAnswer != record.CorrectAnswer)
                    {
                        existingContent.CorrectAnswer = record.CorrectAnswer;
                        hasChanged = true;
                    }
                    
                    if (hasChanged)
                    {
                        Console.WriteLine($"ExerciseContent aktualisiert: {record.ExerciseKey} - {record.Instruction}");
                    }
                }
                else
                {
                    // Content existiert noch nicht, neu anlegen
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
                    Console.WriteLine($"ExerciseContent neu angelegt: {record.ExerciseKey} - {record.Instruction}");
                }
            }
            else
            {
                Console.WriteLine($"Warnung: Exercise mit Key '{record.ExerciseKey}' nicht gefunden.");
            }
        }
        context.SaveChanges();
    }
}

public class ExerciseContentCsv
{
    public string ExerciseKey { get; set; } = string.Empty;
    public int ContentId { get; set; }
    public string Instruction { get; set; } = string.Empty;
    public string NotesToRead { get; set; } = string.Empty;
    public string AllAnswers { get; set; } = string.Empty;
    public string PossibleAnswers { get; set; } = string.Empty;
    public string CorrectAnswer { get; set; } = string.Empty;
}