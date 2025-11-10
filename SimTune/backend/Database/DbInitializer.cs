using backend.DataAccess;
using Microsoft.Extensions.Configuration;

namespace backend.Database;

public static class DbInitializer
{
    public static void Initialize(SimTuneDbContext context, IConfiguration configuration)
    {
        if (context.Exercises.Any())
        {
            return; // Seed-Daten existieren bereits
        }

        context.Exercises.AddRange(
            new Exercise { Description = "Lies c, d und e", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Markiere c, d und e", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Description = "Lies e, f und g", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Markiere e, f und g", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Description = "Lies c bis g", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Markiere c bis g", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Description = "Lies g, a, h und c", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Markiere g, a, h und c", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Description = "Lies alle Stammtöne", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Markiere alle Stammtöne", NotationType = NotationType.Klavier, ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = ExerciseModus.Schreiben }, //10

            new Exercise { Description = "Lies c, d und e", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Schreibe c, d und e", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Description = "Lies e, f und g", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Schreibe e, f und g", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Description = "Lies c bis g", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Schreibe c bis g", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Description = "Lies g, a, h und c", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Schreibe g, a, h und c", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Description = "Lies alle Stammtöne", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Schreibe alle Stammtöne", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = ExerciseModus.Schreiben }, //20

            new Exercise { Description = "Lies Prime bis Quinte", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.Intervalle, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Schreibe Prime bis Quinte", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.Intervalle, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Description = "Lies Sexte bis Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.Intervalle, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Schreibe Sexte bis Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.Intervalle, ExerciseModus = ExerciseModus.Schreiben },
            new Exercise { Description = "Lies alle Intervalle", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.Intervalle, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Schreibe alle Intervalle", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.Intervalle, ExerciseModus = ExerciseModus.Schreiben },

            new Exercise { Description = "Bestimme die Tonleiter, dur und natürliches moll", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.Tonleitern, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Bestimme die Tonleiter, dur und moll", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.Tonleitern, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Bestimme die Tonleiter, dur, moll und natürliches moll", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.Tonleitern, ExerciseModus = ExerciseModus.Lesen },

            new Exercise { Description = "Lies Kreuz-Noten (cis, dis, fis)", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenViolinschluessel, ExerciseModus = ExerciseModus.Lesen }, //30
            new Exercise { Description = "Lies B-Noten (des, es, ges)", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Lies alle Kreuznoten", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Lies alle B-Noten", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenViolinschluessel, ExerciseModus = ExerciseModus.Lesen },
            new Exercise { Description = "Lies alle Versetzungszeichen mit Oktaven", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.VersetzungszeichenViolinschluessel, ExerciseModus = ExerciseModus.Lesen },


            new Exercise { Description = "Bezeichne die kleine Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienViolinschluessel, ExerciseModus = ExerciseModus.Lesen }, //35
            new Exercise { Description = "Bezeichne die eingestrichene Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienViolinschluessel, ExerciseModus = ExerciseModus.Lesen }, //36
            new Exercise { Description = "Bezeichne die zweigestrichene Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienViolinschluessel, ExerciseModus = ExerciseModus.Lesen }, //37
            new Exercise { Description = "Bezeichne die dreigestrichene Oktave", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienViolinschluessel, ExerciseModus = ExerciseModus.Lesen }, //38
            new Exercise { Description = "Bezeichne Noten in allen Oktaven", NotationType = NotationType.Notensystem, ExerciseType = ExerciseType.HilfslinienViolinschluessel, ExerciseModus = ExerciseModus.Lesen } //39
        );

        context.SaveChanges();
        
        var path = configuration["ExerciseContentsPath"];
        Console.WriteLine("ExerciseContentsPath: " + path);
        ImportCsv.ImportExerciseContents(path, context);
    }
}