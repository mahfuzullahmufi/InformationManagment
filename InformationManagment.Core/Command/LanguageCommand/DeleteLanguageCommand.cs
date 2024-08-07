using MediatR;

namespace InformationManagment.Core.Command.LanguageCommand
{
    public class DeleteLanguageCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }
}
