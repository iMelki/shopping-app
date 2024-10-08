using CategoriesAPI.Application.Interfaces;
using CategoriesAPI.Domain.Entities;
using CategoriesAPI.Infrastructure.Data;
using CategoriesAPI.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace CategoriesAPI.Tests.Infrastructure
{
    public class CategoryRepositoryTests
    {
        private readonly ICategoryRepository _repository;
        private readonly ApplicationDbContext _context;

        public CategoryRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "CategoryRepositoryTestDb")
                .Options;

            _context = new ApplicationDbContext(options);
            _context.Categories.AddRange(
                new Category { Id = 1, Name = "Dairy" },
                new Category { Id = 2, Name = "Meat" }
            );
            _context.SaveChanges();

            _repository = new CategoryRepository(_context);
        }

        [Fact]
        public async Task GetAllCategoriesAsync_ReturnsAllCategories()
        {
            // Act
            var categories = await _repository.GetAllCategoriesAsync();

            // Assert
            Assert.Equal(2, ((List<Category>)categories).Count);
        }
    }
}
