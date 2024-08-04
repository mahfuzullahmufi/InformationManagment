using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Queries.PersonQueries
{
    public class GetPersonByIdQuery : IRequest<PersonDto>
    {
        public int Id { get; set; }
    }
}
