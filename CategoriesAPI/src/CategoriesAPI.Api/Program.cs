
using CategoriesAPI.Application.Interfaces;
using CategoriesAPI.Application.Services;
using CategoriesAPI.Infrastructure.Data;
using CategoriesAPI.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using CategoriesAPI.Domain.Exceptions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configure DbContext with SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register repositories
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

// Register services
builder.Services.AddScoped<CategoryService>();

// Enable CORS for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Adjust if your frontend runs on a different URL
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Add Swagger/OpenAPI support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Categories API", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseAuthorization();

// Global Exception Handling Middleware
app.Use(async (context, next) =>
{
    try
    {
        await next.Invoke();
    }
    catch (NotFoundException ex)
    {
        context.Response.StatusCode = 404;
        await context.Response.WriteAsJsonAsync(new { error = ex.Message });
    }
    catch (Exception ex)
    {
        context.Response.StatusCode = 500;
        await context.Response.WriteAsJsonAsync(new { error = "An unexpected error occurred." });
        // Optionally log the exception
    }
});

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
    CategoriesAPI.Infrastructure.Data.DbSeeder.Seed(dbContext);
}

// Define endpoints
app.MapGet("/api/categories", async (CategoryService categoryService) =>
{
    var categories = await categoryService.GetAllCategoriesAsync();
    return Results.Ok(categories);
})
.WithName("GetCategories")
.WithTags("Categories");

app.Run();