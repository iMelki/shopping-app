using CategoriesAPI.Application.Interfaces;
using CategoriesAPI.Application.Services;
using CategoriesAPI.Domain.Entities;
using CategoriesAPI.Domain.Exceptions;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace CategoriesAPI.Tests.Application
{
    public class CategoryServiceTests
    {
        private readonly Mock<ICategoryRepository> _mockRepo;
        private readonly CategoryService _service;

        public CategoryServiceTests()
        {
            _mockRepo = new Mock<ICategoryRepository>();
            _service = new CategoryService(_mockRepo.Object);
        }

        [Fact]
        public async Task GetAllCategoriesAsync_ReturnsCategories()
        {
            // Arrange
            var categories = new List<Category>
            {
                new Category { Id = 1, Name = "Dairy" },
                new Category { Id = 2, Name = "Meat" }
            };
            _mockRepo.Setup(repo => repo.GetAllCategoriesAsync()).ReturnsAsync(categories);

            // Act
            var result = await _service.GetAllCategoriesAsync();

            // Assert
            Assert.Equal(2, ((List<Category>)result).Count);
        }

        [Fact]
        public async Task GetAllCategoriesAsync_ThrowsNotFoundException_WhenNoCategories()
        {
            // Arrange
            _mockRepo.Setup(repo => repo.GetAllCategoriesAsync()).ReturnsAsync((IEnumerable<Category>)null);

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(() => _service.GetAllCategoriesAsync());
        }
    }
}
