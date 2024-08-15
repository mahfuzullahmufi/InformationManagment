using InformationManagment.Api.Controllers;
using InformationManagment.Core.Command.MenuCommand;
using InformationManagment.Core.Queries.MenuQueries;
using Microsoft.AspNetCore.Mvc;

namespace InformationManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : BaseController
    {

        [HttpGet("get-menu-list")]
        public async Task<IActionResult> GetMenuList([FromQuery] GetMenuListQuery query) => Ok(await _mediatr.Send(query));

        [HttpGet("get-menu-by-id")]
        public async Task<IActionResult> GetMenuById([FromQuery] GetMenuByIdQuery query) => Ok(await _mediatr.Send(query));

        [HttpPost("add-or-update-menu")]
        public async Task<IActionResult> AddOrUpdateMenu(AddOrUpdateMenuCommand command)
        {
            command.UserId = CurrentUser.UserId;
            return Ok(await _mediatr.Send(command));
        }

        [HttpDelete("delete-menu")]
        public async Task<IActionResult> DeleteMenu([FromQuery] DeleteMenuCommand command) => Ok(await _mediatr.Send(command));
    }
}
