using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.DataAccess;
using backend.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.Apis.UserManagement;

public class UserLoginService
{
    public static async Task<IResult> LoginUser([FromBody] LoginUserDto userToLoginDto, SimTuneDbContext context)
    {
        var user = context.Users.SingleOrDefault(u => u.Email == userToLoginDto.Email); 

        if (user == null || !BCrypt.Net.BCrypt.Verify(userToLoginDto.Password, user.PasswordHashed))
        {
            return Results.BadRequest(new { Message = "Invalid credentials" });
        }
        
        if (!user.IsVerified)
        {
            return Results.BadRequest(new { Message = "Please verify your email before logging in." });
        }

        var token = GenerateJwtToken(user);

        return Results.Ok(new { Token = token });
    }
    
    public class LoginUserDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    
    private static string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email)
        };
        
        // "EinVielLängererGeheimerSchlüsselDerMehrAls256BitsHat"
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET_KEY")));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "DeinIssuer",
            audience: "DeinAudience",
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}