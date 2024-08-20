using Microsoft.EntityFrameworkCore;
using MyLink.Data.Access;
using MyLink.Models;
using MyLink.Data;
using MyLink.Data.Initialize;
using Microsoft.AspNetCore.Identity;
using MyLink.Data.Repository;
using MyLink.Data.Repository.IRepository;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
const string policyName = "CorsPolicy";
// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddIdentityCore<User>(options =>
    {
        options.User.RequireUniqueEmail = true;

    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyName, builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    //app.MapSwagger().RequireAuthorization();
}

app.UseCors(policyName);
app.UseAuthorization();

app.MapControllers();
app.MapControllers();

//Initialize my db with users
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
var userManager = scope.ServiceProvider
    .GetRequiredService<UserManager<User>>();

await InitializerDb.Initialize(context, userManager);
app.UseCors();
app.Run();
