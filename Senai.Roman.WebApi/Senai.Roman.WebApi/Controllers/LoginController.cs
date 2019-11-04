using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Senai.Roman.WebApi.Domains;
using Senai.Roman.WebApi.Repositories;
using Senai.Roman.WebApi.ViewModels;

namespace Senai.Roman.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        ProfessorRepositorio ProfessorRepositorio = new ProfessorRepositorio();

        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                Professores professorBuscado = ProfessorRepositorio.BuscarPorEmailESenha(login);
                if (professorBuscado == null)
                    return NotFound(new { mensagem = "Email ou senha Inválidos." });


                var claims = new[]
                      {
                    // email
                    new Claim(JwtRegisteredClaimNames.Email, professorBuscado.Email),
                    // id
                    new Claim(JwtRegisteredClaimNames.Jti, professorBuscado.IdProfessor.ToString()),
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("roman-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "Roman.WebApi",
                    audience: "Roman.WebApi",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }

            catch (Exception ex)
            {
                return BadRequest();

            }
        }
    }
}