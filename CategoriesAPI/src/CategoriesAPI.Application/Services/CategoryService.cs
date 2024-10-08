
using CategoriesAPI.Application.Interfaces;
using CategoriesAPI.Domain.Entities;
using CategoriesAPI.Domain.Exceptions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CategoriesAPI.Application.Services
{
    public class CategoryService
    {
        private readonly ICategoryRepository _repository;

        public CategoryService(ICategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            var categories = await _repository.GetAllCategoriesAsync();
            if (categories == null)
            {
                throw new NotFoundException("No categories found.");
            }
            return categories;
        }
    }
}