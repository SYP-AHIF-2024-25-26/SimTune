using backend.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Apis.UserManagement;

public class VerificationService
{
    public static async Task<IResult> VerifyEmail([FromBody] VerifyEmailDto verifyEmailDto, SimTuneDbContext context)
    {
        var user = await context.Users.SingleOrDefaultAsync(u => u.VerificationToken == verifyEmailDto.Token);

        if (user == null)
            return Results.BadRequest(new { Message = "Ungültiger Verifikationstoken." });

        user.IsVerified = true;
        user.VerificationToken = null;
        await context.SaveChangesAsync();

        return Results.Ok(new { Message = "E-Mail erfolgreich verifiziert." });
    }
    
    public class VerifyEmailDto
    {
        public string Token { get; set; }
    }
}