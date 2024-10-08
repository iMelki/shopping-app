
using CategoriesAPI.Domain.Entities;
using System.Linq;

namespace CategoriesAPI.Infrastructure.Data
{
    public static class DbSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            if (!context.Categories.Any())
            {
                context.Categories.AddRange(
                    new Category { Name = "Dairy" },
                    new Category { Name = "Meat" },
                    new Category { Name = "Fruits & Vegetables" }
                );
                context.SaveChanges();
            }
        }
    }
}