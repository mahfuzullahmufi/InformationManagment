using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Queries.CityQueries
{
    public class GetCityListQuery : IRequest<List<CityDto>>
    {
    }
}
