using MediatR;

namespace InformationManagment.Core.Command.MenuCommand
{
    public class DeleteMenuCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }
}
