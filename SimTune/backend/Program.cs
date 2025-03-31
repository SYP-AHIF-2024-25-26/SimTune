using System.Text;
using backend.Apis.Exercises;
using backend.Apis.UserManagement;
using backend.Database;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
var connection = String.Empty;
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddEnvironmentVariables().AddJsonFile("appsettings.Development.json");
    connection = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
}
else
{
    connection = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING");
}
builder.Services.AddDbContext<SimTuneDbContext>(
    // für lokale Entwicklung
    options => options.UseSqlServer(connection)

    // für docker
    //options => options.UseSqlite("FileName=\\app\\Database\\SimTune.db")
);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "default",
        policyBuilder =>
        {
            policyBuilder.WithOrigins("http://localhost:4200", "http://localhost:4300", "http://localhost:8080",
                "http://simtune-frontend:80",
                "https://simtune-frontend.salmonmeadow-e01ebf27.germanywestcentral.azurecontainerapps.io");
            policyBuilder.AllowAnyHeader();
            policyBuilder.AllowAnyMethod();
            policyBuilder.AllowCredentials();
        });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("DeinGeheimerSchlüssel")),
            ValidIssuer = "DeinIssuer",
            ValidAudience = "DeinAudience"
        };
    });

builder.Services.AddAuthorization();


var app = builder.Build();

app.UseAuthentication();

app.UseAuthorization();

app.UseHttpsRedirection();

app.UseCors("default");

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SimTuneDbContext>();
    await context.Database.MigrateAsync();

    DbInitializer.Initialize(context);
}

app.MapExercisesApi();

app.MapUserManagementApi();

await app.RunAsync();