using AutoMapper;
using InformationManagment.Core.Command.MenuCommand;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.MenuHandler
{
    public class AddOrUpdateMenuCommandHandler : IRequestHandler<AddOrUpdateMenuCommand, int>
    {
        private readonly IRepository<Menu> _menuRepository;
        private readonly IMapper _mapper;

        public AddOrUpdateMenuCommandHandler(IRepository<Menu> menuRepository, IMapper mapper)
        {
            _menuRepository = menuRepository;
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
                menu.UpdatedBy = request.UserId;
                menu.UpdatedDate = DateTime.UtcNow;
                _menuRepository.Update(menu);
            }
            else
            {
                menu.CreatedBy = request.UserId;
                menu.CreatedDate = DateTime.UtcNow;
                await _menuRepository.Insert(menu);
            }

            await _menuRepository.SaveChangesAsync();

            return menu.Id;
        }
    }
}
