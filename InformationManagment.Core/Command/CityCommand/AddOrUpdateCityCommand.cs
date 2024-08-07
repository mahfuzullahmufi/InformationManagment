using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Command.CityCommand
{
    public class AddOrUpdateCityCommand : CityDto, IRequest<int>
    {
    }
}
