using System.Threading.Tasks;

namespace MasterDataArmazens.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}