using AutoMapper;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;
using InformationManagment.Core.Queries.MenuQueries;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.MenuHandler
{
    public class GetMenuListQueryHandler : IRequestHandler<GetMenuListQuery, List<MenuDto>>
    {
        private readonly IRepository<Menu> _menuRepository;
        private readonly IMapper _mapper;

        public GetMenuListQueryHandler(IRepository<Menu> menuRepository, IMapper mapper)
        {
            _menuRepository = menuRepository;
            _mapper = mapper;
        }

        public async Task<List<MenuDto>> Handle(GetMenuListQuery request, CancellationToken cancellationToken)
        {
            var result = await _menuRepository.GetsAsync();
            if (result is null)
                return new List<MenuDto>();

            return _mapper.Map<List<MenuDto>>(result);
        }
    }
}
