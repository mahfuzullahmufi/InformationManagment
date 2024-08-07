using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Queries.CountryQueries
{
    public class GetCountryByIdQuery : IRequest<CountryDto>
    {
        public int Id { get; set; }
    }
}
