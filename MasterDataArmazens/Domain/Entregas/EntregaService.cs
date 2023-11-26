using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataArmazens.Domain.Shared;
using MasterDataArmazens.Domain.Entregas;
using MasterDataArmazens.Domain.Armazens;
using System;

namespace MasterDataArmazens.Domain.Entregas
{
    public class EntregaService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEntregaRepository _repo;

        public EntregaService(IUnitOfWork unitOfWork, IEntregaRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<EntregaDTO>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<EntregaDTO> listDto = list.ConvertAll<EntregaDTO>(
                entrega =>
                    new EntregaDTO(
                        entrega.IdentificadorEntrega.AsGuid(),
                        entrega.TempoCarga,
                        entrega.TempoDescarga,
                        entrega.MassaEntrega,
                        entrega.DataEntrega,
                        entrega.Armazem_ID
                    )
            );

            return listDto;
        }

        public async Task<EntregaDTO> GetByIdAsync(IdentificadorEntrega id)
        {
            var entrega = await this._repo.GetByIdAsync(id);

            if (entrega == null)
                return null;
            return new EntregaDTO(
                entrega.IdentificadorEntrega.AsGuid(),
                entrega.TempoCarga,
                entrega.TempoDescarga,
                entrega.MassaEntrega,
                entrega.DataEntrega,
                entrega.Armazem_ID
            );
        }

        // public async Task<List<EntregaDTO>> GetByDataAsync(String data)
        // {
        //     var list = await this._repo.GetAllAsync();
        //     var listaData = new List<Entrega>();
        //     int n;

        //     foreach (var entrega in list)
        //     {
        //         if (int.TryParse(data, out n))
        //         {
        //             if (Int32.Parse(entrega.DataEntrega) == Int32.Parse(data))
        //             {
        //                 listaData.Add(entrega);
        //             }
        //         }
        //     }

        //     List<EntregaDTO> listDTO = listaData.ConvertAll<EntregaDTO>(
        //         entrega =>
        //             new EntregaDTO(
        //                 entrega.IdentificadorEntrega.AsGuid(),
        //                 entrega.TempoCarga,
        //                 entrega.TempoDescarga,
        //                 entrega.MassaEntrega,
        //                 entrega.DataEntrega,
        //                 entrega.Armazem_ID
        //             )
        //     );

        //     return listDTO;
        // }
       //getbydata ordenado por armazem
        public async Task<List<EntregaDTO>> GetByDataAsync(String data)
        {
            var list = await this._repo.GetAllAsync();
            var listaData = new List<Entrega>();
            int n;

            foreach (var entrega in list)
            {
                if (int.TryParse(data, out n))
                {
                    if (Int32.Parse(entrega.DataEntrega) == Int32.Parse(data))
                    {
                        listaData.Add(entrega);
                    }
                }
            }

            var listaDataArmazem = new List<Entrega>();

            foreach (var entrega in listaData)
            {
                if (listaDataArmazem.Count == 0)
                {
                    listaDataArmazem.Add(entrega);
                }
                else
                {
                    for (int i = 0; i < listaDataArmazem.Count; i++)
                    {
                        if (entrega.Armazem_ID.Value.CompareTo(listaDataArmazem[i].Armazem_ID.Value) < 0)
                        {
                            listaDataArmazem.Insert(i, entrega);
                            break;
                        }
                        if (i == listaDataArmazem.Count - 1)
                        {
                            listaDataArmazem.Add(entrega);
                            break;
                        }
                    }
                }
            }

            List<EntregaDTO> listDTO = listaDataArmazem.ConvertAll<EntregaDTO>(
                entrega =>
                    new EntregaDTO(
                        entrega.IdentificadorEntrega.AsGuid(),
                        entrega.TempoCarga,
                        entrega.TempoDescarga,
                        entrega.MassaEntrega,
                        entrega.DataEntrega,
                        entrega.Armazem_ID
                    )
            );

            return listDTO;
        }

        //getbyarmazem ordenado por data
        public async Task<List<EntregaDTO>> GetByArmazemAsync(String armazemID)
        {
            var list = await this._repo.GetAllAsync();
            var listaArmazem = new List<Entrega>();

            foreach (var entrega in list)
            {
                if (entrega.Armazem_ID.Value.Equals(armazemID))
                {
                    listaArmazem.Add(entrega);
                }
            }

            var listaArmazemData = new List<Entrega>();

            foreach (var entrega in listaArmazem)
            {
                if (listaArmazemData.Count == 0)
                {
                    listaArmazemData.Add(entrega);
                }
                else
                {
                    for (int i = 0; i < listaArmazemData.Count; i++)
                    {
                        if (Int32.Parse(entrega.DataEntrega) > Int32.Parse(listaArmazemData[i].DataEntrega))
                        {
                            listaArmazemData.Insert(i, entrega);
                            break;
                        }
                        if (i == listaArmazemData.Count - 1)
                        {
                            listaArmazemData.Add(entrega);
                            break;
                        }
                    }
                }
            }

            List<EntregaDTO> listDTO = listaArmazemData.ConvertAll<EntregaDTO>(
                entrega =>
                    new EntregaDTO(
                        entrega.IdentificadorEntrega.AsGuid(),
                        entrega.TempoCarga,
                        entrega.TempoDescarga,
                        entrega.MassaEntrega,
                        entrega.DataEntrega,
                        entrega.Armazem_ID
                    )
            );

            return listDTO;
        }
        public async Task<List<EntregaDTO>> GetByCargaAsync()
        {
            var list = await this._repo.GetAllAsync();
            var listaCarga = new List<Entrega>();

            foreach (var entrega in list)
            {
                if (listaCarga.Count == 0)
                {
                    listaCarga.Add(entrega);
                }
                else
                {
                    for (int i = 0; i < listaCarga.Count; i++)
                    {
                        if (entrega.TempoCarga.Minutos < listaCarga[i].TempoCarga.Minutos)
                        {
                            listaCarga.Insert(i, entrega);
                            break;
                        }
                        if (i == listaCarga.Count - 1)
                        {
                            listaCarga.Add(entrega);
                            break;
                        }
                    }
                }
            }

            List<EntregaDTO> listDTO = listaCarga.ConvertAll<EntregaDTO>(
                entrega =>
                    new EntregaDTO(
                        entrega.IdentificadorEntrega.AsGuid(),
                        entrega.TempoCarga,
                        entrega.TempoDescarga,
                        entrega.MassaEntrega,
                        entrega.DataEntrega,
                        entrega.Armazem_ID
                    )
            );

            return listDTO;
        }

        public async Task<List<EntregaDTO>> GetByDescargaAsync()
        {
            var list = await this._repo.GetAllAsync();
            var listaDescarga = new List<Entrega>();

            foreach (var entrega in list)
            {
                if (listaDescarga.Count == 0)
                {
                    listaDescarga.Add(entrega);
                }
                else
                {
                    for (int i = 0; i < listaDescarga.Count; i++)
                    {
                        if (entrega.TempoDescarga.Minutos < listaDescarga[i].TempoDescarga.Minutos)
                        {
                            listaDescarga.Insert(i, entrega);
                            break;
                        }
                        if (i == listaDescarga.Count - 1)
                        {
                            listaDescarga.Add(entrega);
                            break;
                        }
                    }
                }
            }

            List<EntregaDTO> listDTO = listaDescarga.ConvertAll<EntregaDTO>(
                entrega =>
                    new EntregaDTO(
                        entrega.IdentificadorEntrega.AsGuid(),
                        entrega.TempoCarga,
                        entrega.TempoDescarga,
                        entrega.MassaEntrega,
                        entrega.DataEntrega,
                        entrega.Armazem_ID
                    )
            );

            return listDTO;
        }

        public async Task<List<EntregaDTO>> GetByDataAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            var listaData = new List<Entrega>();

            foreach (var entrega in list)
            {
                if (listaData.Count == 0)
                {
                    listaData.Add(entrega);
                }
                else
                {
                    for (int i = 0; i < listaData.Count; i++)
                    {
                        if (
                            Int32.Parse(entrega.DataEntrega) < Int32.Parse(listaData[i].DataEntrega)
                        )
                        {
                            listaData.Insert(i, entrega);
                            break;
                        }
                        if (i == listaData.Count - 1)
                        {
                            listaData.Add(entrega);
                            break;
                        }
                    }
                }
            }

            List<EntregaDTO> listDTO = listaData.ConvertAll<EntregaDTO>(
                entrega =>
                    new EntregaDTO(
                        entrega.IdentificadorEntrega.AsGuid(),
                        entrega.TempoCarga,
                        entrega.TempoDescarga,
                        entrega.MassaEntrega,
                        entrega.DataEntrega,
                        entrega.Armazem_ID
                    )
            );

            return listDTO;
        }

        public async Task<List<EntregaDTO>> GetByDataAllRecenbtToOldAsync()
        {
            var list = await this._repo.GetAllAsync();
            var listaDataR = new List<Entrega>();

            foreach (var entrega in list)
            {
                if (listaDataR.Count == 0)
                {
                    listaDataR.Add(entrega);
                }
                else
                {
                    for (int i = 0; i < listaDataR.Count; i++)
                    {
                        if (
                            Int32.Parse(entrega.DataEntrega) > Int32.Parse(listaDataR[i].DataEntrega)
                        )
                        {
                            listaDataR.Insert(i, entrega);
                            break;
                        }
                        if (i == listaDataR.Count - 1)
                        {
                            listaDataR.Add(entrega);
                            break;
                        }
                    }
                }
            }

            List<EntregaDTO> listDTO = listaDataR.ConvertAll<EntregaDTO>(
                entrega =>
                    new EntregaDTO(
                        entrega.IdentificadorEntrega.AsGuid(),
                        entrega.TempoCarga,
                        entrega.TempoDescarga,
                        entrega.MassaEntrega,
                        entrega.DataEntrega,
                        entrega.Armazem_ID
                    )
            );

            return listDTO;
        }

        public async Task<List<EntregaDTO>> GetByMassaAsync()
        {
            var list = await this._repo.GetAllAsync();
            var listaMassa = new List<Entrega>();

            foreach (var entrega in list)
            {
                if (listaMassa.Count == 0)
                {
                    listaMassa.Add(entrega);
                }
                else
                {
                    for (int i = 0; i < listaMassa.Count; i++)
                    {
                        if (entrega.MassaEntrega.Valor < listaMassa[i].MassaEntrega.Valor)
                        {
                            listaMassa.Insert(i, entrega);
                            break;
                        }
                        if (i == listaMassa.Count - 1)
                        {
                            listaMassa.Add(entrega);
                            break;
                        }
                    }
                }
            }

            List<EntregaDTO> listDTO = listaMassa.ConvertAll<EntregaDTO>(
                entrega =>
                    new EntregaDTO(
                        entrega.IdentificadorEntrega.AsGuid(),
                        entrega.TempoCarga,
                        entrega.TempoDescarga,
                        entrega.MassaEntrega,
                        entrega.DataEntrega,
                        entrega.Armazem_ID
                    )
            );

            return listDTO;
        }

        public async Task<List<EntregaDTO>> GetByArmazemAsync()
        {
            var list = await this._repo.GetAllAsync();
            var listaArmazem = new List<Entrega>();

            foreach (var entrega in list)
            {
                if (listaArmazem.Count == 0)
                {
                    listaArmazem.Add(entrega);
                }
                else
                {
                    for (int i = 0; i < listaArmazem.Count; i++)
                    {
                        if (
                            Int32.Parse(entrega.Armazem_ID.Value)
                            < Int32.Parse(listaArmazem[i].Armazem_ID.Value)
                        )
                        {
                            listaArmazem.Insert(i, entrega);
                            break;
                        }
                        if (i == listaArmazem.Count - 1)
                        {
                            listaArmazem.Add(entrega);
                            break;
                        }
                    }
                }
            }

            List<EntregaDTO> listDTO = listaArmazem.ConvertAll<EntregaDTO>(
                entrega =>
                    new EntregaDTO(
                        entrega.IdentificadorEntrega.AsGuid(),
                        entrega.TempoCarga,
                        entrega.TempoDescarga,
                        entrega.MassaEntrega,
                        entrega.DataEntrega,
                        entrega.Armazem_ID
                    )
            );

            return listDTO;
        }

/*        public async Task<List<EntregaDTO>> GetByIdentificadorEntregaAsync()
        {
            var list = await this._repo.GetAllAsync();
            var listaEntrega = new List<Entrega>();

            foreach (var entrega in list)
            {
                if (listaEntrega.Count == 0)
                {
                    listaEntrega.Add(entrega);
                }
                else
                {
                    for (int i = 0; i < listaEntrega.Count; i++)
                    {
                        if (
                            Int32.Parse(entrega.IdentificadorEntrega.Value)
                            < Int32.Parse(listaEntrega[i].IdentificadorEntrega.Value)
                        )
                        {
                            listaEntrega.Insert(i, entrega);
                            break;
                        }
                        if (i == listaEntrega.Count - 1)
                        {
                            listaEntrega.Add(entrega);
                            break;
                        }
                    }
                }
            }

            List<EntregaDTO> listDTO = listaEntrega.ConvertAll<EntregaDTO>(
                entrega =>
                    new EntregaDTO(
                        entrega.IdentificadorEntrega.AsGuid(),
                        entrega.TempoCarga,
                        entrega.TempoDescarga,
                        entrega.MassaEntrega,
                        entrega.DataEntrega,
                        entrega.Armazem_ID
                    )
            );

            return listDTO;
        }
*/
        public async Task<EntregaDTO> AddAsync(EntregaDTO dto, ArmazemDTO aDto)
        {
            var entrega = new Entrega(
                dto.TempoCarga,
                dto.TempoDescarga,
                dto.MassaEntrega,
                dto.Data,
                dto.ArmazemID
            );

            await this._repo.AddAsync(entrega);

            await this._unitOfWork.CommitAsync();

            return new EntregaDTO(
                entrega.IdentificadorEntrega.AsGuid(),
                entrega.TempoCarga,
                entrega.TempoDescarga,
                entrega.MassaEntrega,
                entrega.DataEntrega,
                entrega.Armazem_ID
            );
        }

        public async Task<EntregaDTO> UpdateAsync(EntregaDTO dto)
        {
            try
            {
                var list = await _repo.GetAllAsync();
                foreach (var entrega1 in list)
                {
                    if (
                        entrega1.IdentificadorEntrega
                            .AsString()
                            .Equals(dto.IdentificadorEntrega.ToString())
                    )
                    {
                        entrega1.MudarActive();
                        entrega1.AlterarTempoCarga(dto.TempoCarga);
                        entrega1.AlterarTempoDescarga(dto.TempoDescarga);
                        entrega1.AlterarMassaEntrega(dto.MassaEntrega);
                        entrega1.AlterarDataEntrega(dto.Data);
                        entrega1.AlterarArmazemEntrega(dto.ArmazemID);
                        await this._unitOfWork.CommitAsync();
                        return new EntregaDTO(
                            entrega1.IdentificadorEntrega.AsGuid(),
                            entrega1.TempoCarga,
                            entrega1.TempoDescarga,
                            entrega1.MassaEntrega,
                            entrega1.DataEntrega,
                            entrega1.Armazem_ID
                        );
                    }
                }
            }
            catch (BusinessRuleValidationException e)
            {
                Console.WriteLine(e.Message);
            }
            return null;
        }

        public async Task<EntregaDTO> InactivateAsync(IdentificadorEntrega id)
        {
            var entrega = await this._repo.GetByIdAsync(id);

            if (entrega == null)
                return null;

            // change all fields
            entrega.MarkAsInative();

            await this._unitOfWork.CommitAsync();

            return new EntregaDTO(
                entrega.IdentificadorEntrega.AsGuid(),
                entrega.TempoCarga,
                entrega.TempoDescarga,
                entrega.MassaEntrega,
                entrega.DataEntrega,
                entrega.Armazem_ID
            );
        }

        public async Task<EntregaDTO> DeleteAsync(IdentificadorEntrega id)
        {
            var entrega = await this._repo.GetByIdAsync(id);

            if (entrega == null)
                return null;

            if (entrega.Active)
                throw new BusinessRuleValidationException(
                    "Nao e possivel apagar uma entrega ativa."
                );

            this._repo.Remove(entrega);
            await this._unitOfWork.CommitAsync();

            return new EntregaDTO(
                entrega.IdentificadorEntrega.AsGuid(),
                entrega.TempoCarga,
                entrega.TempoDescarga,
                entrega.MassaEntrega,
                entrega.DataEntrega,
                entrega.Armazem_ID
            );
        }
    }
}
