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
            new Exercise { Description = "Lies c, d und e", Values = "c,d,e", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { Description = "Markiere c, d und e", Values = "c,d,e", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { Description = "Lies e, f und g", Values = "e,f,g", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { Description = "Markiere e, f und g", Values = "e,f,g", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { Description = "Lies c bis g", Values = "c,d,e,f,g", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { Description = "Markiere c bis g", Values = "c,d,e,f,g", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { Description = "Lies g, a, h und c", Values = "g,a,h,c", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { Description = "Markiere g, a, h und c", Values = "g,a,h,c", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { Description = "Lies Orientierungstöne", Values = "Orientierungstöne,c,d,e,f,g,a,h", ExerciseType = ExerciseType.Stammtoene },
            new Exercise {  Description = "Lies alle Stammtöne", Values = "c,d,e,f,g,a,h", ExerciseType = ExerciseType.Stammtoene },
            new Exercise {  Description = "Markiere alle Stammtöne", Values = "c,d,e,f,g,a,h", ExerciseType = ExerciseType.Stammtoene },
            
            new Exercise { Description = "Lies c, d und e", Values = "c,d,e", ExerciseType = ExerciseType.Notensystem },
            new Exercise { Description = "Schreibe c, d und e", Values = "c,d,e", ExerciseType = ExerciseType.Notensystem },
            new Exercise { Description = "Lies e, f und g", Values = "e,f,g", ExerciseType = ExerciseType.Notensystem },
            new Exercise { Description = "Schreibe e, f und g", Values = "e,f,g", ExerciseType = ExerciseType.Notensystem },
            new Exercise { Description = "Lies c bis g", Values = "c,d,e,f,g", ExerciseType = ExerciseType.Notensystem },
            new Exercise { Description = "Schreibe c bis g", Values = "c,d,e,f,g", ExerciseType = ExerciseType.Notensystem },
            new Exercise { Description = "Lies g, a, h und c", Values = "g,a,h,c", ExerciseType = ExerciseType.Notensystem },
            new Exercise { Description = "Schreibe g, a, h und c", Values = "g,a,h,c", ExerciseType = ExerciseType.Notensystem },
            new Exercise { Description = "Lies Orientierungstöne", Values = "Orientierungstöne,c,d,e,f,g,a,h", ExerciseType = ExerciseType.Notensystem },
            new Exercise { Description = "Lies alle Stammtöne", Values = "c,d,e,f,g,a,h", ExerciseType = ExerciseType.Notensystem },
            new Exercise { Description = "Schreibe alle Stammtöne", Values = "c,d,e,f,g,a,h", ExerciseType = ExerciseType.Notensystem },
            
            new Exercise { Description = "Lies Prime bis Quinte", Values = "Prime,Sekunde,Terz,Quarte,Quinte", ExerciseType = ExerciseType.Intervalle },
            new Exercise { Description = "Schreibe Prime bis Quinte", Values = "Prime,Sekunde,Terz,Quarte,Quinte", ExerciseType = ExerciseType.Intervalle },
            new Exercise { Description = "Lies Sexte bis Oktave", Values = "Sexte,Septime,Oktave", ExerciseType = ExerciseType.Intervalle },
            new Exercise { Description = "Schreibe Sexte bis Oktave", Values = "Sexte,Septime,Oktave", ExerciseType = ExerciseType.Intervalle },
            new Exercise { Description = "Lies alle Intervalle", Values = "Prime,Sekunde,Terz,Quarte,Quinte,Sexte,Septime,Oktave", ExerciseType = ExerciseType.Intervalle },
            new Exercise { Description = "Schreibe alle Intervalle", Values = "Prime,Sekunde,Terz,Quarte,Quinte,Sexte,Septime,Oktave", ExerciseType = ExerciseType.Intervalle },
            
            new Exercise {Description = "Bestimme die Tonleiter,dur und natürliches moll", Values = "Dur,Natürliches Moll", ExerciseType = ExerciseType.Tonleitern},
            new Exercise {Description = "Bestimme die Tonleiter,dur und moll", Values = "Dur,Natürliches Moll", ExerciseType = ExerciseType.Tonleitern},
            new Exercise {Description = "Bestimme die Tonleiter,dur & moll und natürliches moll", Values = "Dur,Natürliches Moll", ExerciseType = ExerciseType.Tonleitern}
        );

        context.SaveChanges();
    }
}