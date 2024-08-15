using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Command.MenuCommand
{
    public class AddOrUpdateMenuCommand : MenuDto, IRequest<int>
    {
        public string? UserId { get; set; }
    }
}
