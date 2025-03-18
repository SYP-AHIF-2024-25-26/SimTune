using backend.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace backend.Database;

public class SimTuneDbContext : DbContext
{
    public SimTuneDbContext(DbContextOptions<SimTuneDbContext> options) : base(options)
    {
        
    }

    public DbSet<User> Users { get; set; }
    
    public DbSet<Exercise> Exercises { get; set; }
    
    public DbSet<UserExercise> UserExercises { get; set; }
    
    public DbSet<ExerciseContent> ExerciseContents { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Exercise>().HasData(
            new Exercise { ExerciseId = 1, Description = "Lies c, d und e", Values = "c,d,e", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { ExerciseId = 2, Description = "Markiere c, d und e", Values = "c,d,e", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { ExerciseId = 3, Description = "Lies e, f und g", Values = "e,f,g", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { ExerciseId = 4, Description = "Markiere e, f und g", Values = "e,f,g", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { ExerciseId = 5, Description = "Lies c bis g", Values = "c,d,e,f,g", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { ExerciseId = 6, Description = "Markiere c bis g", Values = "c,d,e,f,g", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { ExerciseId = 7, Description = "Lies g, a, h und c", Values = "g,a,h,c", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { ExerciseId = 8, Description = "Markiere g, a, h und c", Values = "g,a,h,c", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { ExerciseId = 9, Description = "Lies Orientierungstöne", Values = "Orientierungstöne,c,d,e,f,g,a,h", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { ExerciseId = 10, Description = "Lies alle Stammtöne", Values = "c,d,e,f,g,a,h", ExerciseType = ExerciseType.Stammtoene },
            new Exercise { ExerciseId = 11, Description = "Markiere alle Stammtöne", Values = "c,d,e,f,g,a,h", ExerciseType = ExerciseType.Stammtoene },
            
            new Exercise { ExerciseId = 12, Description = "Lies c, d und e", Values = "c,d,e", ExerciseType = ExerciseType.Notensystem },
            new Exercise { ExerciseId = 13, Description = "Schreibe c, d und e", Values = "c,d,e", ExerciseType = ExerciseType.Notensystem },
            new Exercise { ExerciseId = 14, Description = "Lies e, f und g", Values = "e,f,g", ExerciseType = ExerciseType.Notensystem },
            new Exercise { ExerciseId = 15, Description = "Schreibe e, f und g", Values = "e,f,g", ExerciseType = ExerciseType.Notensystem },
            new Exercise { ExerciseId = 16, Description = "Lies c bis g", Values = "c,d,e,f,g", ExerciseType = ExerciseType.Notensystem },
            new Exercise { ExerciseId = 17, Description = "Schreibe c bis g", Values = "c,d,e,f,g", ExerciseType = ExerciseType.Notensystem },
            new Exercise { ExerciseId = 18, Description = "Lies g, a, h und c", Values = "g,a,h,c", ExerciseType = ExerciseType.Notensystem },
            new Exercise { ExerciseId = 19, Description = "Schreibe g, a, h und c", Values = "g,a,h,c", ExerciseType = ExerciseType.Notensystem },
            new Exercise { ExerciseId = 20, Description = "Lies Orientierungstöne", Values = "Orientierungstöne,c,d,e,f,g,a,h", ExerciseType = ExerciseType.Notensystem },
            new Exercise { ExerciseId = 21, Description = "Lies alle Stammtöne", Values = "c,d,e,f,g,a,h", ExerciseType = ExerciseType.Notensystem },
            new Exercise { ExerciseId = 22, Description = "Schreibe alle Stammtöne", Values = "c,d,e,f,g,a,h", ExerciseType = ExerciseType.Notensystem },
            
            new Exercise { ExerciseId = 23, Description = "Lies Prime bis Quinte", Values = "Prime,Sekunde,Terz,Quarte,Quinte", ExerciseType = ExerciseType.Intervalle },
            new Exercise { ExerciseId = 24, Description = "Schreibe Prime bis Quinte", Values = "Prime,Sekunde,Terz,Quarte,Quinte", ExerciseType = ExerciseType.Intervalle },
            new Exercise { ExerciseId = 25, Description = "Lies Sexte bis Oktave", Values = "Sexte,Septime,Oktave", ExerciseType = ExerciseType.Intervalle },
            new Exercise { ExerciseId = 26, Description = "Schreibe Sexte bis Oktave", Values = "Sexte,Septime,Oktave", ExerciseType = ExerciseType.Intervalle },
            new Exercise { ExerciseId = 27, Description = "Lies alle Intervalle", Values = "Prime,Sekunde,Terz,Quarte,Quinte,Sexte,Septime,Oktave", ExerciseType = ExerciseType.Intervalle },
            new Exercise { ExerciseId = 28, Description = "Schreibe alle Intervalle", Values = "Prime,Sekunde,Terz,Quarte,Quinte,Sexte,Septime,Oktave", ExerciseType = ExerciseType.Intervalle },
            
            new Exercise {ExerciseId = 29, Description = "Bestimme die Tonleiter", Values = "Dur,natürlichesMoll", ExerciseType = ExerciseType.Tonleitern},
            new Exercise {ExerciseId = 30, Description = "Bestimme die Tonleiter", Values = "Dur,natürlichesMoll,harmonischesMoll,melodischesMoll", ExerciseType = ExerciseType.Tonleitern},
            new Exercise {ExerciseId = 31, Description = "Bestimme die Tonleiter", Values = "Dur,natürlichesMoll,harmonischesMoll,melodischesMoll", ExerciseType = ExerciseType.Tonleitern},
            new Exercise {ExerciseId = 32, Description = "Bestimme die Tonleiter", Values = "Dur,natürlichesMoll,harmonischesMoll,melodischesMoll", ExerciseType = ExerciseType.Tonleitern}
        );

    }
    
}