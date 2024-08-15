using AutoMapper;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;
using InformationManagment.Core.Queries.MenuQueries;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.MenuHandler
{
    public class GetMenuByIdQueryHandler : IRequestHandler<GetMenuByIdQuery, MenuDto>
    {
        private readonly IRepository<Menu> _menuRepository;
        private readonly IMapper _mapper;

        public GetMenuByIdQueryHandler(IRepository<Menu> menuRepository, IMapper mapper)
        {
            _menuRepository = menuRepository;
            _mapper = mapper;
        }

        public async Task<MenuDto> Handle(GetMenuByIdQuery request, CancellationToken cancellationToken)
        {
            var menu = await _menuRepository.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (menu is null)
                return new MenuDto();

            return _mapper.Map<MenuDto>(menu);
        }
    }
}
