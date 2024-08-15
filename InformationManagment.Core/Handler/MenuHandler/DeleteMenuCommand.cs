using InformationManagment.Core.Command.MenuCommand;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.MenuHandler
{
    public class DeleteMenuCommandHandler : IRequestHandler<DeleteMenuCommand, bool>
    {
        private readonly IRepository<Menu> _menuRepository;

        public DeleteMenuCommandHandler(IRepository<Menu> menuRepository)
        {
            _menuRepository = menuRepository;
        }

        public async Task<bool> Handle(DeleteMenuCommand request, CancellationToken cancellationToken)
        {
            var menu = await _menuRepository.GetByIdAsync(request.Id);
            if (menu == null)
                return false;

            await _menuRepository.Delete(request.Id);
            await _menuRepository.SaveChangesAsync();

            return true;
        }
    }
}
