using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Queries.MenuQueries
{
    public class GetMenuByIdQuery : IRequest<MenuDto>
    {
        public int Id { get; set; }
    }
}
