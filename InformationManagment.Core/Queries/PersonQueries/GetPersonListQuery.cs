using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Queries.PersonQueries
{
    public class GetPersonListQuery : IRequest<List<PersonDto>>
    {
    }
}
