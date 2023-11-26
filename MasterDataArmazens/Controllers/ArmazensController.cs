using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MasterDataArmazens.Domain.Shared;
using MasterDataArmazens.Domain.Armazens;


namespace MasterDataArmazens.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArmazensController : ControllerBase
    {
        private readonly ArmazemService _service;

        public ArmazensController(ArmazemService service)
        {
            _service = service;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArmazemDTO>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ArmazemDTO>> GetGetById(String id)
        {
            var armazem = await _service.GetByIdAsync(new ArmazemID(id));

            if (armazem == null)
            {
                return NotFound();
            }

            return armazem;
        }

        // POST: api/Categories
        [HttpPost]
        public async Task<ActionResult<ArmazemDTO>> Create(ArmazemDTO dto)
        {
            try
            {
                var armazem = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = armazem.Id }, armazem);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ArmazemDTO>> Update(String id, ArmazemDTO dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var armazem = await _service.UpdateAsync(dto);

                if (armazem == null)
                {
                    return NotFound();
                }
                return Ok(armazem);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // Inactivate: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ArmazemDTO>> SoftDelete(String id)
        {
            var armazem = await _service.InactivateAsync(new ArmazemID(id));

            if (armazem == null)
            {
                return NotFound();
            }

            return Ok(armazem);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<ArmazemDTO>> HardDelete(String id)
        {
            try
            {
                var armazem = await _service.DeleteAsync(new ArmazemID(id));

                if (armazem == null)
                {
                    return NotFound();
                }

                return Ok(armazem);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}