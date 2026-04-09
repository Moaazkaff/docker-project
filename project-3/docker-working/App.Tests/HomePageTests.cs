using System.Net;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace DotNet.Docker.Tests;

public sealed class HomePageTests : IClassFixture<DotNetDockerFactory>
{
    private readonly DotNetDockerFactory _factory;

    public HomePageTests(DotNetDockerFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task HomePage_ReturnsSuccessAndHeading()
    {
        using var client = _factory.CreateClient();

        var response = await client.GetAsync("/");
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        Assert.Equal("text/html; charset=utf-8", response.Content.Headers.ContentType?.ToString());
        Assert.Contains("<title>Northstar Market</title>", content);
        Assert.Contains("Elevated essentials for the modern home.", content);
        Assert.Contains("Browse the current collection.", content);
    }

    [Fact]
    public async Task Health_ReturnsSuccess()
    {
        using var client = _factory.CreateClient();

        var response = await client.GetAsync("/health");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("\"status\":\"healthy\"", content);
        Assert.Contains("\"timestamp\":", content);
    }
}

public sealed class DotNetDockerFactory : WebApplicationFactory<global::Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        var projectPath = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "../../../../App"));
        builder.UseContentRoot(projectPath);
    }
}
