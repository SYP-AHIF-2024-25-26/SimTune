using MailKit.Net.Smtp;
using MimeKit;

namespace backend.Apis.UserManagement;

public class EmailService
{
    public async Task SendEmailAsync(string toEmail, string subject, string htmlBody)
    {
        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse("simtune.real@gmail.com"));
        email.To.Add(MailboxAddress.Parse(toEmail));
        email.Subject = subject;

        var builder = new BodyBuilder { HtmlBody = htmlBody };
        email.Body = builder.ToMessageBody();

        using var smtp = new SmtpClient();
        await smtp.ConnectAsync("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
        await smtp.AuthenticateAsync("simtune.real@gmail.com", "ikpwnvxskpyhrdkx");
        await smtp.SendAsync(email);
        await smtp.DisconnectAsync(true);
    }
}