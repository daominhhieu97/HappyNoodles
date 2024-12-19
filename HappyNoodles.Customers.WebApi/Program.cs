using HappyNoodles.Models;
using HappyNoodles.Services.Interfaces;
using HappyNoodles.Services.Services;
using MassTransit;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Serilog;
using Quartz;
using HappyNoodles.Services.Jobs;
using HappyNoodles.Models.Messages;
using RabbitMQ.Client;

var builder = WebApplication.CreateBuilder(args);
var configurations = builder.Configuration;
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddCookie()
.AddGoogle(GoogleDefaults.AuthenticationScheme, options =>
{
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
builder.Services.AddSingleton<AppConfig>();
builder.Services.AddCors(options =>
        {
            //TODO: Only allow requests from Frontend app
            options.AddPolicy("AllowAnyOriginPolicy",
                builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
        });

builder.Services.AddDbContext<HappyNoodlesContext>(options =>
        options.UseNpgsql(configurations["DatabaseConnection:ConnectionString"]), ServiceLifetime.Scoped);

builder.Services.AddMassTransit(x =>
{
    x.AddPublishMessageScheduler();
    x.AddQuartzConsumers();

    x.AddConsumers(typeof(OrderCreatedConsumer).Assembly);
    Uri schedulerEndpoint = new Uri("queue:scheduler");
    x.AddMessageScheduler(schedulerEndpoint);
    x.UsingRabbitMq((context, cfg) =>
    {
        var appConfig = context.GetRequiredService<AppConfig>();

        ///TODO: using app configurations
        cfg.Host(appConfig.RabbitMQHost, appConfig.RabbitMQVirtualHost, h =>
        {
            h.Username(appConfig.RabbitMQUsername);
            h.Password(appConfig.RabbitMQPassword);
        });

        // Custom retry policy
        cfg.UseMessageRetry(r =>
        {
            r.Incremental(3,
                TimeSpan.FromSeconds(1),
                TimeSpan.FromSeconds(2));
        });

        // Configure RabbitMQ retry
        //cfg.UseDelayedRedelivery(r =>
        //{
        //    r.Intervals(
        //        TimeSpan.FromMinutes(5),
        //        TimeSpan.FromMinutes(15),
        //        TimeSpan.FromMinutes(30)
        //    );
        //});
        cfg.UseMessageScheduler(schedulerEndpoint);
        cfg.UsePublishMessageScheduler();

        cfg.ReceiveEndpoint("order-created-queue", e =>
        {
            e.ConfigureConsumeTopology = false; // Don't auto-bind exchanges
            e.Bind("order.created.exchange", x =>
            {
                x.RoutingKey = "order.created"; // Define routing key
            });
            e.ConfigureConsumer<OrderCreatedConsumer>(context);
        });

        cfg.Message<OrderCreated>(x =>
        {
            x.SetEntityName("order.created.exchange"); // Define direct exchange name
        });
        cfg.ConfigureEndpoints(context);

        cfg.ReceiveEndpoint("owner-notification-queue", e =>
        {
            e.Bind("inventory.topic", x =>
            {
                x.ExchangeType = ExchangeType.Topic;
                x.RoutingKey = "inventory.low";
            });
            e.ConfigureConsumer<OwnerNotificationConsumer>(context);
        });

        cfg.ReceiveEndpoint("partner-notification-queue", e =>
        {
            e.Bind("ecommerce.topic", x =>
            {
                x.ExchangeType = ExchangeType.Topic;
                x.RoutingKey = "inventory.low";
            });
            e.ConfigureConsumer<PartnerNotificationConsumer>(context);
        });
    });
});

builder.Services.AddQuartz(q =>
{
    q.UseMicrosoftDependencyInjectionJobFactory();

    var jobKey = JobKey.Create(nameof(WelcomeNewDayMessageRecurringJob));

    //q.AddJob<WelcomeNewDayMessageRecurringJob>(jobKey);
    //q.AddTrigger(t => t
    //    .ForJob(jobKey)
    //    .WithIdentity($"{nameof(WelcomeNewDayMessageRecurringJob)}-trigger")
    //    .WithSimpleSchedule(s =>
    //        s.WithIntervalInMinutes(1)
    //         .RepeatForever())
    //);
});

builder.Services.AddQuartzHostedService(options =>
{
    options.WaitForJobsToComplete = true;
});

///TODO: using an extension method
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<IItemService, ItemService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<ISmsService, SmsService>();
builder.Services.AddScoped<IIdempotencyService, IdempotencyService>();
builder.Services.AddScoped<IMessageBusService, MessageBusService>();
builder.Services.AddScoped<IRoutingKeyResolver, RabbitMqRoutingKeyResolver>();
builder.Services.AddScoped<IJsonService, JsonService>();
builder.Services.AddScoped<IEventService, EventService>();

builder.Services.AddAutoMapper(configurations =>
{
    configurations.AddMaps(typeof(UserProfile).Assembly);
});

///TODO: Move settings to app configuration
builder.Host.UseSerilog((context, services, configuration) => configuration
    .MinimumLevel.Error()
    .WriteTo.File("logs/error-.txt",
        rollingInterval: RollingInterval.Day,
        retainedFileTimeLimit: TimeSpan.FromDays(7),
        fileSizeLimitBytes: 10 * 1024 * 1024,
        rollOnFileSizeLimit: true));

var app = builder.Build();
app.UseHttpsRedirection();
app.UseCors("AllowAnyOriginPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllerRoute("Default", "api/{controller=Home}/{action=Index}/{id?}");

app.Run();