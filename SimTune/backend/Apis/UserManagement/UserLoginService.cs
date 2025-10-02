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
    private readonly IConfiguration _configuration;

    public UserLoginService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    public static async Task<IResult> LoginUser([FromBody] LoginUserDto userToLoginDto, SimTuneDbContext context, IConfiguration configuration)
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

        var token = GenerateJwtToken(user, configuration);

        return Results.Ok(new { Token = token });
    }
    
    public class LoginUserDto
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
    
    private static string GenerateJwtToken(User user, IConfiguration configuration)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email)
        };
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: configuration["Jwt:Issuer"],
            audience: configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}