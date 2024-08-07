using InformationManagment.Core.Models;
using MediatR;

namespace InformationManagment.Core.Queries.LanguageQueries
{
    public class GetLanguageByIdQuery : IRequest<LanguageDto>
    {
        public int Id { get; set; }
    }
}
