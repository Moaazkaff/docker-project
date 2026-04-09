// var builder = WebApplication.CreateBuilder(new WebApplicationOptions
// {
//     Args = args,
//     WebRootPath = "frontend"
// });
// var app = builder.Build();

// app.UseDefaultFiles();
// app.UseStaticFiles();

// app.MapGet("/", () => Results.Redirect("/index.html"));
// app.MapFallbackToFile("index.html");
// app.MapGet("/health", () => new { status = "healthy", timestamp = DateTime.UtcNow });

// app.Run("http://0.0.0.0:8080");

// public partial class Program
// {
// }
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/health", () => new { status = "healthy", timestamp = DateTime.UtcNow });

// your API routes go here
// app.MapControllers();

app.Run("http://0.0.0.0:8080");

public partial class Program { }