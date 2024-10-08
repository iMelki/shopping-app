
using CategoriesAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CategoriesAPI.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Category> Categories => Set<Category>();

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}