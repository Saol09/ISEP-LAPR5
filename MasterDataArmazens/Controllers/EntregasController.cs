using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MasterDataArmazens.Domain.Shared;
using MasterDataArmazens.Domain.Entregas;
using MasterDataArmazens.Domain.Armazens;

namespace MasterDataArmazens.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntregaController : ControllerBase
    {
        private readonly EntregaService _service;
        private readonly ArmazemService _wService;

        public EntregaController(EntregaService service, ArmazemService armazemService)
        {
            _service = service;
            _wService = armazemService;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntregaDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EntregaDTO>> GetGetById(Guid id)
        {
            var list = await _service.GetAllAsync();

            foreach (var entrega in list)
            {
                if (entrega.IdentificadorEntrega.Equals(id))
                {
                    return entrega;
                }
            }
            return NotFound();
        }

        [HttpGet("cargaAscendente")]
        public async Task<ActionResult<IEnumerable<EntregaDTO>>> GetGetAllByCarga()
        {
            return await _service.GetByCargaAsync();
        }

        [HttpGet("descargaAscendente")]
        public async Task<ActionResult<IEnumerable<EntregaDTO>>> GetGetAllByDescarga()
        {
            return await _service.GetByDescargaAsync();
        }

        [HttpGet("dataAscendente")]
        public async Task<ActionResult<IEnumerable<EntregaDTO>>> GetGetAllByData()
        {
            return await _service.GetByDataAllAsync();
        }

        [HttpGet("dataRecente")]
        public async Task<ActionResult<IEnumerable<EntregaDTO>>> GetByDataAllRecenbtToOld()
        {
            return await _service.GetByDataAllRecenbtToOldAsync();
        }

        [HttpGet("massaAscendente")]
        public async Task<ActionResult<IEnumerable<EntregaDTO>>> GetGetAllByMassa()
        {
            return await _service.GetByMassaAsync();
        }

        [HttpGet("armazemAscendente")]
        public async Task<ActionResult<IEnumerable<EntregaDTO>>> GetGetAllByArmazem()
        {
            return await _service.GetByArmazemAsync();
        }

      /*  [HttpGet("identificadorAscendente")]
        public async Task<ActionResult<IEnumerable<EntregaDTO>>> GetGetAllByIdentificadorEntrega()
        {
            return await _service.GetByIdentificadorEntregaAsync();
        }*/

        [HttpGet("{data}/getEntregaData")]
        public async Task<ActionResult<IEnumerable<EntregaDTO>>> GetGetByData(String data)
        {
            return await _service.GetByDataAsync(data);
        }

         [HttpGet("{armazemID}/getEntregaArmazem")]
        public async Task<ActionResult<IEnumerable<EntregaDTO>>> GetByArmazem(String armazemID)
        {
            return await _service.GetByArmazemAsync(armazemID);
        }

        // POST: api/Categories
        [HttpPost]
        public async Task<ActionResult<EntregaDTO>> Create(EntregaDTO dto)
        {
            try
            {
                var armazem = await _wService.GetByIdAsync(dto.ArmazemID);

                if (armazem == null)
                {
                    throw new BusinessRuleValidationException("O armazem não existe.");
                }

                var entrega = await _service.AddAsync(dto, armazem);

                return CreatedAtAction(
                    nameof(GetGetById),
                    new { id = entrega.IdentificadorEntrega },
                    entrega
                );
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // PUT: api/Categories/5
        [HttpPut("{id}/Update")]
        public async Task<ActionResult<EntregaDTO>> Update(Guid id, EntregaDTO dto)
        {
            try
            {
                var list = await _service.GetAllAsync();

                foreach (var entrega in list)
                {
                    if (entrega.IdentificadorEntrega.Equals(id))
                    {
                        var entregaNova = await _service.UpdateAsync(dto);
                        if (entregaNova == null)
                        {
                            Console.WriteLine("Não é possivel alterar esta entrega");
                        }

                        return Ok(entregaNova);
                    }
                }
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            return BadRequest();
        }

        // Inactivate: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EntregaDTO>> SoftDelete(Guid id)
        {
            var entrega = await _service.InactivateAsync(new IdentificadorEntrega(id));

            if (entrega == null)
            {
                return NotFound();
            }

            return Ok(entrega);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<EntregaDTO>> HardDelete(Guid id)
        {
            try
            {
                var entrega = await _service.DeleteAsync(new IdentificadorEntrega(id));

                if (entrega == null)
                {
                    return NotFound();
                }

                return Ok(entrega);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
