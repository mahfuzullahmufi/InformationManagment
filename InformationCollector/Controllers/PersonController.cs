using InformationManagment.Api.Controllers;
using InformationManagment.Core.Command.PersonCommand;
using InformationManagment.Core.Queries.PersonQueries;
using Microsoft.AspNetCore.Mvc;

namespace InformationCollector.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : BaseController
    {
        [HttpGet("get-person-list")]
        public async Task<IActionResult> GetPersonList([FromQuery] GetPersonListQuery query) => Ok(await _mediatr.Send(query));

        [HttpGet("get-person-by-id")]
        public async Task<IActionResult> GetPersonById([FromQuery] GetPersonByIdQuery query) => Ok(await _mediatr.Send(query));

        [HttpPost("add-or-update-person")]
        public async Task<IActionResult> AddOrUpdatePerson(AddOrUpdatePersonCommand command) => Ok(await _mediatr.Send(command));

        [HttpDelete("delete-person")]
        public async Task<IActionResult> DeletePerson([FromQuery] DeletePersonCommand command) => Ok(await _mediatr.Send(command));
    }
}
