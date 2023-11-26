using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterDataArmazens.Infrastructure.Entregas;
using MasterDataArmazens.Domain.Entregas;
using MasterDataArmazens.Domain.Armazens;

namespace MasterDataArmazens.Infrastructure.Entregas
{
    internal class EntregasEntityTypeConfiguration : IEntityTypeConfiguration<Entrega>
    {
        public void Configure(EntityTypeBuilder<Entrega> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            builder.HasKey(b => b.IdentificadorEntrega);
            builder.OwnsOne(b => b.TempoCarga);
            builder.OwnsOne(b => b.TempoDescarga);
            builder.OwnsOne(b => b.MassaEntrega);
           /* builder.OwnsOne(typeof(string), "DataEntrega");*/
            /*builder.HasOne (b => b.Armazem).WithMany().HasForeignKey(b => b.ArmazemID);
            builder.Property (b => b.ArmazemID).HasConversion(v => v.Value, v=> new Domain.Armazens.ArmazemID(v));*/
        }
    }
}   