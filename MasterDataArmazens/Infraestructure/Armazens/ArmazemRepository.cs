using MasterDataArmazens.Domain.Armazens;
using MasterDataArmazens.Infrastructure.Shared;

namespace MasterDataArmazens.Infrastructure.Armazens
{
    public class ArmazemRepository : BaseRepository<Armazem, ArmazemID>, IArmazemRepository
    {

        public ArmazemRepository(MySQLContext context) : base(context.Armazens)
        {

        }


    }
}