using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Queries.CountryQueries
{
    public class GetCountryListQuery : IRequest<List<CountryDto>>
    {
    }
}
