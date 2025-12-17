using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.DataAccess
{
    public class Exercise
    {
        public int Id { get; set; }
        [Required]
        public string Key { get; set; } = string.Empty; // Eindeutiger String-Key für externe Referenzen
        public string Description { get; set; } = string.Empty; // Was BEI der Übung zu tun ist
        public NotationType NotationType { get; set; }  // Klavier oder Notensystem
        public ExerciseType ExerciseType { get; set; }  // Intervalle, Tonleitern
        public ExerciseModus ExerciseModus { get; set; }  // lesen oder schreiben
        public List<ExerciseContent> ExerciseContents { get; set; } = new();
    }

    public class ExerciseContent
    {
        public int Id { get; set; }
        public int ExerciseId { get; set; }
        public Exercise? Exercise { get; set; } // Navigation Property
        public string Instruction { get; set; } = string.Empty; // Was IN der Übung zu tun ist
        public string NotesToRead { get; set; } = string.Empty; // falls ExerciseModus = "lesen"
        public string CorrectAnswer { get; set; } = string.Empty;
        public string PossibleAnswers { get; set; } = string.Empty;
        public string AllAnswers { get; set; } = string.Empty;
    }

    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHashed { get; set; } = string.Empty;

        public string? VerificationToken { get; set; }
        public bool IsVerified { get; set; } = false;

        public int Progress { get; set; } = 0;

        public List<UserExercise> UserExercises { get; set; } = new();
        public List<UserExamSimulation> UserExamSimulations { get; set; } = new();
    }

    public class UserExercise
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User? User { get; set; }

        [ForeignKey("Exercise")]
        public int ExerciseId { get; set; }
        public Exercise? Exercise { get; set; }

        public double HighestScore { get; set; }
        public int Attempts { get; set; }
    }

    public class UserExamSimulation
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User? User { get; set; }

        public int QuestionCount { get; set; }
        public string ExerciseAllocations { get; set; } = string.Empty; // Komma-separiert: "Töne,Intervalle,Tonleitern"
        public double AchievedPercentage { get; set; }
        public DateTime CompletedAt { get; set; }
    }

    public enum NotationType
    {
        Klavier,
        Notensystem
    }

    public enum ExerciseModus
    {
        Lesen,
        Schreiben
    }

    public enum ExerciseType
    {
        StammtoeneKlavier,
        VersetzungszeichenKlavier,
        StammtoeneViolinschluessel,
        VersetzungszeichenViolinschluessel,
        HilfslinienViolinschluessel,
        StammtoeneBassschluessel,
        VersetzungszeichenBassschluessel,
        HilfslinienBassschluessel,
        IntervalleBasis,
        IntervalleRein,
        IntervalleGrossKlein,
        IntervalleVermindertUebermaessig,
        Tonleitern
    }
}

