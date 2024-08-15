using AutoMapper;
using InformationManagment.Core.Command.MenuCommand;
using InformationManagment.Core.DbContext;
using InformationManagment.Core.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InformationManagment.Core.Handler.MenuHandler
{
    public class AddOrUpdateMenuCommandHandler : IRequestHandler<AddOrUpdateMenuCommand, int>
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public AddOrUpdateMenuCommandHandler(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task<int> Handle(AddOrUpdateMenuCommand request, CancellationToken cancellationToken)
        {
            ArgumentNullException.ThrowIfNull(request);

            if (string.IsNullOrEmpty(request.MenuName))
                throw new ArgumentException("Menu name is required");

            var menu = _mapper.Map<Menu>(request);

            if (menu.Id > 0)
            {
                var existingMenu = await _databaseContext.Menus
                    .Include(x => x.MenuRoles)
                    .Where(x => x.Id == request.Id)
                    .FirstOrDefaultAsync(x => x.Id == request.Id)
                    .ConfigureAwait(false);

                if (existingMenu == null)
                {
                    throw new ArgumentNullException("Menu not found");
                }

                _databaseContext.MenuRoles.RemoveRange(existingMenu.MenuRoles);

                _mapper.Map(request, existingMenu);

                menu.UpdatedBy = request.UserId;
                menu.UpdatedDate = DateTime.UtcNow;

                existingMenu.MenuRoles.Clear();
                existingMenu.MenuRoles = menu.MenuRoles.ToList();
            }
            else
            {
                menu.CreatedBy = request.UserId;
                menu.CreatedDate = DateTime.UtcNow;
                await _databaseContext.Menus.AddAsync(menu);
            }

            await _databaseContext.SaveChangesAsync();

            return menu.Id;
        }
    }
}
