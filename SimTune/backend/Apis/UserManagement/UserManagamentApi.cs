using Microsoft.AspNetCore.Mvc;

namespace backend.Apis.UserManagement;

public static partial class UserManagamentApi
{
    public static IEndpointRouteBuilder MapUserManagementApi(this IEndpointRouteBuilder app)
    {
        app.MapPost("/usermanagement/register", UserRegisterer.RegisterUser)
            .WithName(nameof(UserRegisterer.RegisterUser))
            .WithDescription("Registers a user")
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<int>(StatusCodes.Status200OK);
        
        app.MapPost("/usermanagement/login", UserLoginer.LoginUser)
            .WithName(nameof(UserLoginer.LoginUser))
            .WithDescription("Logs in a user")
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<int>(StatusCodes.Status200OK);

        return app;
    }
}