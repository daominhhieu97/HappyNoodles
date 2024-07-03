using HappyNoodles.Models;
using Microsoft.EntityFrameworkCore;

public class HappyNoodlesContext : DbContext
{
    public HappyNoodlesContext(DbContextOptions<HappyNoodlesContext> options) : base(options)
    {
    }

    // DbSet for each entity
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
         modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.Property(x => x.Id).ValueGeneratedOnAdd();
            entity.Property(u => u.Email).IsRequired();
            entity.Property(u => u.Address);
            entity.Property(u => u.PhoneNumber);
        });

        base.OnModelCreating(modelBuilder);
    }
}