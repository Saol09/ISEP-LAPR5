using MasterDataArmazens.Domain.Shared;
using MasterDataArmazens.Domain.Entregas;


namespace MasterDataArmazens.Domain.Entregas
{
    public interface IEntregaRepository : IRepository<Entrega, IdentificadorEntrega>
    {
    }
}