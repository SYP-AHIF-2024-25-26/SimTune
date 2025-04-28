using backend.Database;
using Microsoft.EntityFrameworkCore;

namespace backend.Apis.UserManagement;

public class VerificationService
{
    public static async Task<IResult> VerifyEmail(string token, SimTuneDbContext context)
    {
        var user = await context.Users.SingleOrDefaultAsync(u => u.VerificationToken == token);

        if (user == null)
            return Results.BadRequest(new { Message = "Ungültiger Verifikationstoken." });

        user.IsVerified = true;
        user.VerificationToken = null;
        await context.SaveChangesAsync();

        return Results.Ok(new { Message = "E-Mail erfolgreich verifiziert." });
    }
}