using backend.DataAccess;
using backend.Database;
using Microsoft.AspNetCore.Mvc;

namespace backend.Apis.UserManagement;

public class UserRegisterService
{
    private readonly EmailService _emailService;
    private readonly IConfiguration _configuration;

    public UserRegisterService(EmailService emailService, IConfiguration configuration)
    {
        _emailService = emailService;
        _configuration = configuration;
    }

    public static async Task<IResult> RegisterUser([FromBody] RegisterUserDto userDto, SimTuneDbContext context,
        EmailService emailService, IConfiguration configuration)
    {
        var existingUser = context.Users.SingleOrDefault(u => u.Email == userDto.Email);
        if (existingUser != null)
        {
            return Results.BadRequest(new { Message = "User with this email already exists." });
        }

        var verificationToken = Convert.ToBase64String(Guid.NewGuid().ToByteArray());

        var newUser = new User
        {
            UserId = 0,
            Username = userDto.Username,
            Email = userDto.Email,
            PasswordHashed = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
            VerificationToken = verificationToken,
            IsVerified = false
        };

        context.Users.Add(newUser);
        await context.SaveChangesAsync();

        var verificationLink = $"{configuration["AppUrl"]}/verify?token={verificationToken}";
        var emailHtml = $@"
            <h2>Willkommen bei SimTune!</h2>
            <p>Bitte klicken Sie auf den folgenden Link, um Ihre E-Mail-Adresse zu bestätigen:</p>
            <a href='{verificationLink}'>E-Mail bestätigen</a>
        ";

        await emailService.SendEmailAsync(
            userDto.Email,
            "SimTune - E-Mail Verifikation",
            emailHtml
        );

        return Results.Ok(new { Message = "User registered successfully" });
    }

    public class RegisterUserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}