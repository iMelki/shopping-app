using CategoriesAPI.Domain.Entities;
using CategoriesAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Xunit;

namespace CategoriesAPI.Tests.Domain
{
    public class DbSeederTests
    {
        private readonly ApplicationDbContext _context;

        public DbSeederTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "DbSeederTestDb")
                .Options;

            _context = new ApplicationDbContext(options);
        }

        [Fact]
        public void Seed_AddsInitialCategories_WhenDatabaseIsEmpty()
        {
            // Arrange
            _context.Categories.RemoveRange(_context.Categories);
            _context.SaveChanges();

            // Act
            DbSeeder.Seed(_context);

            // Assert
            Assert.Equal(3, _context.Categories.Count());
            Assert.Contains(_context.Categories, c => c.Name == "Dairy");
            Assert.Contains(_context.Categories, c => c.Name == "Meat");
            Assert.Contains(_context.Categories, c => c.Name == "Fruits & Vegetables");
        }

        [Fact]
        public void Seed_DoesNotAddCategories_WhenDatabaseIsNotEmpty()
        {
            // Arrange
            _context.Categories.Add(new Category { Name = "Existing Category" });
            _context.SaveChanges();

            // Act
            DbSeeder.Seed(_context);

            // Assert
            Assert.Equal(1, _context.Categories.Count());
        }
    }
}
