using AutoMapper;
using InformationManagment.Core.DbContext;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;
using InformationManagment.Core.Queries.MenuQueries;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace InformationManagment.Core.Handler.MenuHandler
{
    public class GetMenuListQueryHandler : IRequestHandler<GetMenuListQuery, List<MenuDto>>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public GetMenuListQueryHandler(UserManager<ApplicationUser> userManager, DatabaseContext databaseContext, IMapper mapper)
        {
            _userManager = userManager;
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task<List<MenuDto>> Handle(GetMenuListQuery request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);
            var userRole = await _userManager.GetRolesAsync(user);

            var result = await _databaseContext.Menus
                .Include(x => x.MenuRoles)
                .ThenInclude(x => x.Role)
                .Where(x => x.MenuRoles.Any(r => r.Role.Name == userRole.FirstOrDefault()))
                .ToListAsync(cancellationToken);

            if (result is null)
                return new List<MenuDto>();

            return _mapper.Map<List<MenuDto>>(result);
        }
    }
}
