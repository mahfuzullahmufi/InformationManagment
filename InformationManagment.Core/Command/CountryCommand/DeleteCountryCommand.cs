using MediatR;

namespace InformationManagment.Core.Command.CountryCommand
{
    public class DeleteCountryCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }
}
