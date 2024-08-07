using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Queries.LanguageQueries
{
    public class GetLanguageListQuery : IRequest<List<LanguageDto>>
    {
    }
}
