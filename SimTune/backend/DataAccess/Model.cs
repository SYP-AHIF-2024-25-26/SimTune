using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.DataAccess
{
    public class Exercise
    {
        public int ExerciseId { get; set; }
        public string Description { get; set; } = string.Empty; // Was BEI der Übung zu tun ist
        public string NotationType { get; set; } = string.Empty; // Klavier oder Notensystem
        public ExerciseType ExerciseType { get; set; }  // Intervalle, Tonleitern
        public string ExerciseModus { get; set; } = string.Empty; // lesen oder schreiben
        public List<ExerciseContent> ExerciseContents { get; set; } = new();
    }

    public class ExerciseContent
    {
        public int ExerciseContentId { get; set; }
        [JsonIgnore]
        public Exercise Exercise { get; set; } // Navigation Property
        public string Instruction { get; set; } = string.Empty; // Was IN der Übung zu tun ist
        public string NotesToRead { get; set; } = string.Empty; // falls ExerciseModus = "lesen"
        public string CorrectAnswer { get; set; } = string.Empty;
        public string PossibleAnswers { get; set; } = string.Empty;
        public string AllAnswers { get; set; } = string.Empty;
    }

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

        public string? VerificationToken { get; set; }
        public bool IsVerified { get; set; } = false;

        public int Progress { get; set; } = 0;

        public ICollection<UserExercise> UserExercises { get; set; } = new List<UserExercise>();
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

        public double HighestScore { get; set; }
        public int Attempts { get; set; }
    }

    public enum ExerciseType
    {
        StammtoeneKlavier,
        VersetzungszeichenKlavier,
        StammtoeneViolinschluessel,
        VersetzungszeichenViolinschluessel,
        HilfslinienViolinschluessel,
        StammtoeneBassschluessel,
        VersetzungszeichenBasschluessel,
        HilfslinienBassschluessel,
        Intervalle,
        Tonleitern
    }
}

