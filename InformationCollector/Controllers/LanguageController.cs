using InformationManagment.Api.Controllers;
using InformationManagment.Core.Command.LanguageCommand;
using InformationManagment.Core.Queries.LanguageQueries;
using Microsoft.AspNetCore.Mvc;

namespace InformationCollector.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : BaseController
    {
        [HttpGet("get-language-list")]
        public async Task<IActionResult> GetLanguageList([FromQuery] GetLanguageListQuery query) => Ok(await _mediatr.Send(query));

        [HttpGet("get-language-by-id")]
        public async Task<IActionResult> GetLanguageById([FromQuery] GetLanguageByIdQuery query) => Ok(await _mediatr.Send(query));

        [HttpPost("add-or-update-language")]
        public async Task<IActionResult> AddOrUpdateLanguage(AddOrUpdateLanguageCommand command) => Ok(await _mediatr.Send(command));

        [HttpDelete("delete-language")]
        public async Task<IActionResult> DeleteLanguage([FromQuery] DeleteLanguageCommand command) => Ok(await _mediatr.Send(command));
    }
}
