using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Command.PersonCommand
{
    public class AddOrUpdatePersonCommand : PersonDto, IRequest<int>
    {
    }
}
