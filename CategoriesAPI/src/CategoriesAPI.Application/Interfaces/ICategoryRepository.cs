
using CategoriesAPI.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CategoriesAPI.Application.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
    }
}