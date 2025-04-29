using Microsoft.AspNetCore.Mvc;

namespace backend.Apis.UserManagement;

public static partial class UserManagamentApi
{
    public static IEndpointRouteBuilder MapUserManagementApi(this IEndpointRouteBuilder app)
    {
        app.MapPost("/usermanagement/register", UserRegisterService.RegisterUser)
            .WithName(nameof(UserRegisterService.RegisterUser))
            .WithDescription("Registers a user")
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<int>(StatusCodes.Status200OK);
        
        app.MapPost("/usermanagement/login", UserLoginService.LoginUser)
            .WithName(nameof(UserLoginService.LoginUser))
            .WithDescription("Logs in a user")
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<int>(StatusCodes.Status200OK);
        
        app.MapPost("/usermanagement/verify", VerificationService.VerifyEmail)
            .WithName(nameof(VerificationService.VerifyEmail))
            .WithDescription("Verifies a user's email")
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<int>(StatusCodes.Status200OK);
        
        app.MapPost("usermanagement/completed-exercise", UserExerciseService.StoreCompletedUserExercise)
            .WithName(nameof(UserExerciseService.StoreCompletedUserExercise))
            .WithDescription("Stores a completed user exercise")
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<int>(StatusCodes.Status200OK);
        
        app.MapGet("usermanagement/completed-exercises", UserExerciseService.GetCompletedUserExercises)
            .WithName(nameof(UserExerciseService.GetCompletedUserExercises))
            .WithDescription("Gets all completed user exercises with statistics")
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<int>(StatusCodes.Status200OK);

        return app;
    }
}