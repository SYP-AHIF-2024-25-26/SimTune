using backend.DataAccess;

namespace backend.Database;

public static class DbInitializer
{
    public static void Initialize(SimTuneDbContext context)
    {
        if (context.Exercises.Any())
        {
            return; // Seed-Daten existieren bereits
        }

        context.Exercises.AddRange(
            new Exercise { Description = "Lies c, d und e", NotationType = "Klavier", ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = "Lesen" },
            new Exercise { Description = "Markiere c, d und e", NotationType = "Klavier", ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = "Markieren" },
            new Exercise { Description = "Lies e, f und g", NotationType = "Klavier", ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = "Lesen" },
            new Exercise { Description = "Markiere e, f und g", NotationType = "Klavier", ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = "Markieren" },
            new Exercise { Description = "Lies c bis g", NotationType = "Klavier", ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = "Lesen" },
            new Exercise { Description = "Markiere c bis g", NotationType = "Klavier", ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = "Markieren" },
            new Exercise { Description = "Lies g, a, h und c", NotationType = "Klavier", ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = "Lesen" },
            new Exercise { Description = "Markiere g, a, h und c", NotationType = "Klavier", ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = "Markieren" },
            new Exercise { Description = "Lies alle Stammtöne", NotationType = "Klavier", ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = "Lesen" },
            new Exercise { Description = "Markiere alle Stammtöne", NotationType = "Klavier", ExerciseType = ExerciseType.StammtoeneKlavier, ExerciseModus = "Markieren" }, //10

            new Exercise { Description = "Lies c, d und e", NotationType = "Notensystem", ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = "Lesen" },
            new Exercise { Description = "Schreibe c, d und e", NotationType = "Notensystem", ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = "Markieren" },
            new Exercise { Description = "Lies e, f und g", NotationType = "Notensystem", ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = "Lesen" },
            new Exercise { Description = "Schreibe e, f und g", NotationType = "Notensystem", ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = "Markieren" },
            new Exercise { Description = "Lies c bis g", NotationType = "Notensystem", ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = "Lesen" },
            new Exercise { Description = "Schreibe c bis g", NotationType = "Notensystem", ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = "Markieren" },
            new Exercise { Description = "Lies g, a, h und c", NotationType = "Notensystem", ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = "Lesen" },
            new Exercise { Description = "Schreibe g, a, h und c", NotationType = "Notensystem", ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = "Markieren" },
            new Exercise { Description = "Lies alle Stammtöne", NotationType = "Notensystem", ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = "Lesen" },
            new Exercise { Description = "Schreibe alle Stammtöne", NotationType = "Notensystem", ExerciseType = ExerciseType.StammtoeneViolinschluessel, ExerciseModus = "Markieren" }, //20

            new Exercise { Description = "Lies Prime bis Quinte", NotationType = "Notensystem", ExerciseType = ExerciseType.Intervalle, ExerciseModus = "Lesen" },
            new Exercise { Description = "Schreibe Prime bis Quinte", NotationType = "Notensystem", ExerciseType = ExerciseType.Intervalle, ExerciseModus = "Markieren" },
            new Exercise { Description = "Lies Sexte bis Oktave", NotationType = "Notensystem", ExerciseType = ExerciseType.Intervalle, ExerciseModus = "Lesen" },
            new Exercise { Description = "Schreibe Sexte bis Oktave", NotationType = "Notensystem", ExerciseType = ExerciseType.Intervalle, ExerciseModus = "Markieren" },
            new Exercise { Description = "Lies alle Intervalle", NotationType = "Notensystem", ExerciseType = ExerciseType.Intervalle, ExerciseModus = "Lesen" },
            new Exercise { Description = "Schreibe alle Intervalle", NotationType = "Notensystem", ExerciseType = ExerciseType.Intervalle, ExerciseModus = "Markieren" },

            new Exercise { Description = "Bestimme die Tonleiter, dur und natürliches moll", NotationType = "Notensystem", ExerciseType = ExerciseType.Tonleitern, ExerciseModus = "Lesen" },
            new Exercise { Description = "Bestimme die Tonleiter, dur und moll", NotationType = "Notensystem", ExerciseType = ExerciseType.Tonleitern, ExerciseModus = "Lesen" },
            new Exercise { Description = "Bestimme die Tonleiter, dur, moll und natürliches moll", NotationType = "Notensystem", ExerciseType = ExerciseType.Tonleitern, ExerciseModus = "Lesen" }
        );

        context.SaveChanges();
        
        ImportCsv.ImportExerciseContents("./exercisecontents.csv", context);
    }
}