using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataArmazens.Domain.Shared;

namespace MasterDataArmazens.Domain.Armazens
{
    public class ArmazemService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IArmazemRepository _repo;

        public ArmazemService(IUnitOfWork unitOfWork, IArmazemRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<ArmazemDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<ArmazemDTO> listDto = list.ConvertAll<ArmazemDTO>(armazem => new ArmazemDTO(armazem.Id.AsString(), armazem.DesignacaoArmazem, armazem.EnderecoArmazem, armazem.CoordenadasArmazem, armazem.Active));

            return listDto;
        }

        public async Task<ArmazemDTO> GetByIdAsync(ArmazemID id)
        {
            var armazem = await this._repo.GetByIdAsync(id);

            if (armazem == null)
                return null;

            return new ArmazemDTO(armazem.Id.AsString(), armazem.DesignacaoArmazem, armazem.EnderecoArmazem, armazem.CoordenadasArmazem, armazem.Active);
        }

        public async Task<ArmazemDTO> AddAsync(ArmazemDTO dto)
        {
            var armazem = new Armazem(dto.Id, dto.DesignacaoArmazem, dto.EnderecoArmazem, dto.CoordenadasArmazem);

            await this._repo.AddAsync(armazem);

            await this._unitOfWork.CommitAsync();

            return new ArmazemDTO(armazem.Id.AsString(), armazem.DesignacaoArmazem, armazem.EnderecoArmazem, armazem.CoordenadasArmazem, armazem.Active);
        }

        public async Task<ArmazemDTO> UpdateAsync(ArmazemDTO dto)
        {
            var armazem = await this._repo.GetByIdAsync(new ArmazemID(dto.Id));

            if (armazem == null)
                return null;

            // change all field
            armazem.AlterarDesignacaoArmazem(dto.DesignacaoArmazem);
            armazem.AlterarEnderecoArmazem(dto.EnderecoArmazem);
            armazem.AlterarCoordenadasArmazem(dto.CoordenadasArmazem);



            await this._unitOfWork.CommitAsync();

            return new ArmazemDTO(armazem.Id.AsString(), armazem.DesignacaoArmazem, armazem.EnderecoArmazem, armazem.CoordenadasArmazem, armazem.Active);
        }

        public async Task<ArmazemDTO> InactivateAsync(ArmazemID id)
        {
            var armazem = await this._repo.GetByIdAsync(id);

            if (armazem == null)
                return null;

            // change all fields
            armazem.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return new ArmazemDTO(armazem.Id.AsString(), armazem.DesignacaoArmazem, armazem.EnderecoArmazem, armazem.CoordenadasArmazem, armazem.Active);
        }

        public async Task<ArmazemDTO> DeleteAsync(ArmazemID id)
        {
            var armazem = await this._repo.GetByIdAsync(id);

            if (armazem == null)
                return null;

            if (armazem.Active)
                throw new BusinessRuleValidationException("Nao e possivel apagar um armazem ativo.");

            this._repo.Remove(armazem);
            await this._unitOfWork.CommitAsync();

            return new ArmazemDTO(armazem.Id.AsString(), armazem.DesignacaoArmazem, armazem.EnderecoArmazem, armazem.CoordenadasArmazem, armazem.Active);
        }
    }
}