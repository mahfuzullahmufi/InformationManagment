using MediatR;

namespace InformationManagment.Core.Command.PersonCommand
{
    public class DeletePersonCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }
}
