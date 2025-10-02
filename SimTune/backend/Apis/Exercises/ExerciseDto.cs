using backend.DataAccess;

namespace backend.Apis.Exercises;

public class ExerciseDto
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public string NotationType { get; set; } = string.Empty;
    public string ExerciseType { get; set; } = string.Empty;
    public string ExerciseModus { get; set; } = string.Empty;
    public List<ExerciseContentDto> ExerciseContents { get; set; } = new();
}

public class ExerciseContentDto
{
    public int Id { get; set; }
    public string Instruction { get; set; } = string.Empty;
    public string NotesToRead { get; set; } = string.Empty;
    public string CorrectAnswer { get; set; } = string.Empty;
    public string PossibleAnswers { get; set; } = string.Empty;
    public string AllAnswers { get; set; } = string.Empty;
}
