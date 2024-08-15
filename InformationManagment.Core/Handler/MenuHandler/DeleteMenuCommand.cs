using InformationManagment.Core.Command.MenuCommand;
using InformationManagment.Core.DbContext;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InformationManagment.Core.Handler.MenuHandler
{
    public class DeleteMenuCommandHandler : IRequestHandler<DeleteMenuCommand, bool>
    {
        private readonly DatabaseContext _databaseContext;

        public DeleteMenuCommandHandler(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<bool> Handle(DeleteMenuCommand request, CancellationToken cancellationToken)
        {
            var menu = await _databaseContext.Menus
                    .Include(x => x.MenuRoles)
                    .Where(x => x.Id == request.Id)
                    .FirstOrDefaultAsync(x => x.Id == request.Id)
                    .ConfigureAwait(false);
            if (menu == null)
                return false;

            _databaseContext.MenuRoles.RemoveRange(menu.MenuRoles);
            _databaseContext.Menus.Remove(menu);
            await _databaseContext.SaveChangesAsync();

            return true;
        }
    }
}
