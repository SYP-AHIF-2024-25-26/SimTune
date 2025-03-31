using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.DataAccess
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHashed { get; set; } = string.Empty;

        public int Progress { get; set; } = 0;

        public ICollection<UserExercise> UserExercises { get; set; } = new List<UserExercise>();
    }

    public class Exercise
    {
        [Key]
        public int ExerciseId { get; set; }

        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Values { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public ExerciseType ExerciseType { get; set; }

        public ICollection<UserExercise> UserExercises { get; set; } = new List<UserExercise>();
        public ICollection<ExerciseContent> ExerciseContents { get; set; } = new List<ExerciseContent>();
    }

    public class UserExercise
    {
        [Key]
        public int UserExerciseId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("Exercise")]
        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }

        public int Completed { get; set; }
        public int Score { get; set; }
        public int Attempts { get; set; }
    }

    public class ExerciseContent
    {
        [Key]
        public int ContentId { get; set; }

        [ForeignKey("Exercise")]
        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }

        [Required]
        public string Question { get; set; } = string.Empty;

        public string? NotePositions { get; set; }

        [Required]
        public string AnswerOptions { get; set; } = string.Empty;

        [Required]
        public string CorrectAnswer { get; set; } = string.Empty;

        public string? StaffImage { get; set; }
    }

    public enum ExerciseType
    {
        Stammtoene,
        Notensystem,
        Intervalle,
        Versetzungszeichen,
        Hilfslinien,
        Tonleitern
    }
}
