using InformationManagment.Api.Controllers;
using InformationManagment.Core.Command.CityCommand;
using InformationManagment.Core.Queries.CityQueries;
using Microsoft.AspNetCore.Mvc;

namespace InformationCollector.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : BaseController
    {
        [HttpGet("get-city-list")]
        public async Task<IActionResult> GetCityList([FromQuery] GetCityListQuery query) => Ok(await _mediatr.Send(query));

        [HttpGet("get-city-by-id")]
        public async Task<IActionResult> GetCityById([FromQuery] GetCityByIdQuery query) => Ok(await _mediatr.Send(query));

        [HttpPost("add-or-update-city")]
        public async Task<IActionResult> AddOrUpdateCity(AddOrUpdateCityCommand command) => Ok(await _mediatr.Send(command));

        [HttpDelete("delete-city")]
        public async Task<IActionResult> DeleteCity([FromQuery] DeleteCityCommand command) => Ok(await _mediatr.Send(command));
    }
}
