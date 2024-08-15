using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Queries.MenuQueries
{
    public class GetMenuListQuery : IRequest<List<MenuDto>>
    {
        public string? UserId { get; set; }
    }
}
