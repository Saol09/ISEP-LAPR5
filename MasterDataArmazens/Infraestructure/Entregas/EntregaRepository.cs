using MasterDataArmazens.Domain.Entregas;
using MasterDataArmazens.Infrastructure.Shared;


namespace MasterDataArmazens.Infrastructure.Entregas
{
    public class EntregaRepository : BaseRepository<Entrega, IdentificadorEntrega>, IEntregaRepository
    {

        public EntregaRepository(MySQLContext context) : base(context.Entregas)
        {

        }


    }
}