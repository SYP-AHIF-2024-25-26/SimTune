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
            new Exercise { ExerciseId = 11, Description = "Markiere alle Stammtöne", Values = "c,d,e,f,g,a,h", ExerciseType = ExerciseType.Stammtoene }
        );
    }
    
}