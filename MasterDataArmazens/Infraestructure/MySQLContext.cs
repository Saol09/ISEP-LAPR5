using Microsoft.EntityFrameworkCore;
using MasterDataArmazens.Domain.Armazens;
using MasterDataArmazens.Domain.Entregas;
using MasterDataArmazens.Infrastructure.Armazens;
using MasterDataArmazens.Infrastructure.Entregas;

namespace MasterDataArmazens.Infrastructure
{
    public class MySQLContext : DbContext
    {

        public DbSet<Armazem> Armazens { get; set; }
        public DbSet<Entrega> Entregas { get; set; }

        public string ConnectionString { get; set; }
        public MySQLContext(DbContextOptions<MySQLContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());*/

            modelBuilder.ApplyConfiguration(new ArmazemEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new EntregasEntityTypeConfiguration());
        }
    }
}