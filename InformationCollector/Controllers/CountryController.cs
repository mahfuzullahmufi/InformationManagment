using InformationManagment.Api.Controllers;
using InformationManagment.Core.Command.CountryCommand;
using InformationManagment.Core.Queries.CountryQueries;
using Microsoft.AspNetCore.Mvc;

namespace InformationCollector.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : BaseController
    {
        [HttpGet("get-country-list")]
        public async Task<IActionResult> GetCountryList([FromQuery] GetCountryListQuery query) => Ok(await _mediatr.Send(query));

        [HttpGet("get-country-by-id")]
        public async Task<IActionResult> GetCountryById([FromQuery] GetCountryByIdQuery query) => Ok(await _mediatr.Send(query));

        [HttpPost("add-or-update-country")]
        public async Task<IActionResult> AddOrUpdateCountry(AddOrUpdateCountryCommand command) => Ok(await _mediatr.Send(command));

        [HttpDelete("delete-country")]
        public async Task<IActionResult> DeleteCountry([FromQuery] DeleteCountryCommand command) => Ok(await _mediatr.Send(command));
    }
}
