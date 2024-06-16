// API/Program.cs
using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Domain.Interfaces;
using Infrastructure.Repositories;
using Core.Interfaces;
using Core.Services;

var builder = WebApplication.CreateBuilder(args);

// Servicos
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 21))));

// Dependencias
builder.Services.AddScoped<ILivro, LivroRepository>();
builder.Services.AddScoped<ILivroService, LivroService>();

var app = builder.Build();

// Http request
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAllOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();