using HappyNoodles.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        // Table name
        builder.ToTable("Orders");

        // Primary key
        builder.HasKey(o => o.Id);

        // Properties
        builder.Property(o => o.DeliveryAddress)
            .IsRequired()
            .HasMaxLength(500); // Adjust max length as needed

        builder.Property(o => o.PhoneNumber)
            .IsRequired()
            .HasMaxLength(20); // Adjust max length as needed

        builder.Property(o => o.OrderCode)
            .IsRequired()
            .HasMaxLength(50); // Adjust max length as needed

        builder.Property(o => o.OrderDate)
            .IsRequired();

        // Relationships
        builder.HasMany(o => o.Items)
            .WithOne(i => i.Order)
            .HasForeignKey(i => i.OrderId)
            .OnDelete(DeleteBehavior.Cascade); // Use Cascade delete behavior if needed
    }
}