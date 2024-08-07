using MediatR;

namespace InformationManagment.Core.Command.CityCommand
{
    public class DeleteCityCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }
}
