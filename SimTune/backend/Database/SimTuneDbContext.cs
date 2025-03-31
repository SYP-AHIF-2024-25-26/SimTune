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
    
}