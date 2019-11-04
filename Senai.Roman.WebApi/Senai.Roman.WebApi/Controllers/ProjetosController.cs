using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.Roman.WebApi.Domains;
using Senai.Roman.WebApi.Repositories;

namespace Senai.Roman.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class ProjetosController : ControllerBase
    {
        ProjetoRepositorio ProjetoRepositorio = new ProjetoRepositorio();

        [Authorize]
        [HttpGet]

        public IActionResult Listar()
        {
            return Ok(ProjetoRepositorio.Listar());
        }

        [Authorize]
        [HttpPost]
        public IActionResult Cadastrar(Projetos projeto)
        {
            try
            {
                ProjetoRepositorio.Cadastrar(projeto);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Ops, Erro: " + ex.Message });
            }
        }


    }
}