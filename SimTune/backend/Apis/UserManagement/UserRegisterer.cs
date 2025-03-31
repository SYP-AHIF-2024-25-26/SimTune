using backend.DataAccess;
using backend.Database;
using Microsoft.AspNetCore.Mvc;

namespace backend.Apis.UserManagement;

public class UserRegisterer
{
    public static async Task<IResult> RegisterUser([FromBody] UserDto userDto, SimTuneDbContext context)
    {
        var existingUser = context.Users.SingleOrDefault(u => u.Email == userDto.Email);
        if (existingUser != null)
        {
            return Results.BadRequest(new { Message = "User with this email already exists." });
        }

        var newUser = new User
        {
            UserId = 0,
            Username = userDto.Username,
            Email = userDto.Email,
            PasswordHashed = BCrypt.Net.BCrypt.HashPassword(userDto.Password)
        };
        
        context.Users.Add(newUser);
        await context.SaveChangesAsync();

        return Results.Ok(new { Message = "User registered successfully" });
    }
    
    public class UserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}