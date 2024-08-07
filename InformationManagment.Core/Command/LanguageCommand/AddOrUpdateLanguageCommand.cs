using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Command.LanguageCommand
{
    public class AddOrUpdateLanguageCommand : LanguageDto, IRequest<int>
    {
    }
}
