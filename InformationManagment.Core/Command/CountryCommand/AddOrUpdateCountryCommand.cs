using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Command.CountryCommand
{
    public class AddOrUpdateCountryCommand : CountryDto, IRequest<int>
    {
    }
}
