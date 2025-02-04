using System.ComponentModel.DataAnnotations;

namespace backend.DataAccess;

public class User
{
    public required int UserId { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string PasswordHashed { get; set; }
    public int Progress { get; set; }
}

public class Exercise
{
    public int ExerciseId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Values { get; set; }
    public required ExerciseType ExerciseType { get; set; }
}

public class UserExercise
{
    public int UserExerciseId { get; set; }
    public int UserId { get; set; }
    public int ExerciseId { get; set; }
    public int Completed { get; set; }
    public int Score { get; set; }
    public int Attempts { get; set; }
}

public class ExerciseContent
{
    [Key]
    public int ContentId { get; set; }
    public int ExerciseId { get; set; }
    public string Question { get; set; }
    public string? NotePositions { get; set; }
    public string AnswerOptions { get; set; }
    public string CorrectAnswer { get; set; }
    public string? StaffImage { get; set; }
}

public enum ExerciseType
{
    Stammtoene,
    Versetzungszeichen,
    Hilfslinien
}