using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Queries.CityQueries
{
    public class GetCityByIdQuery : IRequest<CityDto>
    {
        public int Id { get; set; }
    }
}
