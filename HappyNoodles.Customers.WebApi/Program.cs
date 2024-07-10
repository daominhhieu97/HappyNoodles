using System.Text;
using FluentValidation;
using FluentValidation.AspNetCore;
using HappyNoodles.Services.Interfaces;
using HappyNoodles.Services.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
var configurations = builder.Configuration;
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(options => {
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddCookie()
.AddGoogle(GoogleDefaults.AuthenticationScheme, options => {
    options.ClientId = configurations.GetSection("GoogleKeys:ClientId").Value;
    options.ClientSecret = configurations.GetSection("GoogleKeys:ClientSecret").Value;
}).AddJwtBearer(options =>
    {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = configurations["Jwt:Issuer"],
        ValidAudience = configurations["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configurations["Jwt:SecretKey"]))
    };
    });
builder.Services.AddControllers();

//Add fluent validation service
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<UserValidator>();

builder.Services.AddSingleton<AppConfig>();
builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAnyOriginPolicy",
                builder =>
                {
                    builder.AllowAnyOrigin() // Allow requests from any origin
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
        });
builder.Services.AddDbContext<HappyNoodlesContext>(options =>
        options.UseNpgsql(configurations["DatabaseConnection:ConnectionString"]));
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddAutoMapper(configurations => {
    configurations.AddMaps(typeof(UserProfile).Assembly);
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAnyOriginPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllerRoute("Default", "api/{controller=Home}/{action=Index}/{id?}");

app.Run();