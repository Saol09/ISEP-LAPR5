using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterDataArmazens.Infrastructure.Armazens;
using MasterDataArmazens.Domain.Armazens;

namespace MasterDataArmazens.Infrastructure.Armazens
{
    internal class ArmazemEntityTypeConfiguration : IEntityTypeConfiguration<Armazem>
    {
        public void Configure(EntityTypeBuilder<Armazem> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            //builder.ToTable("Categories", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.EnderecoArmazem);
            builder.OwnsOne(b => b.CoordenadasArmazem);
            builder.OwnsOne(b => b.DesignacaoArmazem);
            // builder.OwnsOne(b => b.ArmazemIdManual);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}