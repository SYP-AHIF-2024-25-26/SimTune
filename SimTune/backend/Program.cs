using backend.Apis.Exercises;
using backend.Database;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<SimTuneDbContext>(
    // für lokale Entwicklung
    //options => options.UseSqlite("FileName=Database/SimTune.db")
    
    // für docker
    options => options.UseSqlite("FileName=\\app\\Database\\SimTune.db")
);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "default",
        policyBuilder =>
        {
            policyBuilder.WithOrigins("http://localhost:4200", "http://localhost:4300", "http://localhost:8080", "http://simtune-frontend:80");
            policyBuilder.AllowAnyHeader();
            policyBuilder.AllowAnyMethod();
            policyBuilder.AllowCredentials();
        });
});


var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("default");

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SimTuneDbContext>();
    await context.Database.EnsureDeletedAsync();
    await context.Database.EnsureCreatedAsync();
}

app.MapExercisesApi();

await app.RunAsync();