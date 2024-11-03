using HappyNoodles.Models.Entities;
using Microsoft.EntityFrameworkCore;

public class HappyNoodlesContext : DbContext
{
    public HappyNoodlesContext(DbContextOptions<HappyNoodlesContext> options) : base(options)
    {
    }

    // DbSet for each entity
    public DbSet<User> Users { get; set; }
    public DbSet<Menu> Menus { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Item> Items { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
       {
           entity.HasKey(u => u.Id);
           entity.Property(x => x.Id).ValueGeneratedOnAdd();
           entity.Property(u => u.Email).IsRequired();
           entity.Property(u => u.Active).HasDefaultValue(true);
       });

        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(i => i.Id);
            entity.Property(i => i.Name).IsRequired().HasMaxLength(100);
            entity.Property(i => i.Price).HasColumnType("decimal(18,2)");

            entity.HasOne(i => i.Category)
                  .WithMany(c => c.Items)
                  .HasForeignKey(i => i.CategoryId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Additional model configuration can go here

        base.OnModelCreating(modelBuilder);
    }
}