using AutoMapper;
using InformationManagment.Core.DbContext;
using InformationManagment.Core.Models;
using InformationManagment.Core.Queries.PersonQueries;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InformationManagment.Core.Handler.PersonHandler
{
    public class GetPersonListQueryHandler : IRequestHandler<GetPersonListQuery, List<PersonDto>>
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public GetPersonListQueryHandler(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task<List<PersonDto>> Handle(GetPersonListQuery request, CancellationToken cancellationToken)
        {
            var result = await _databaseContext.Persons
                .Include(x => x.Country)
                .Include(x => x.City)
                .Include(x => x.PersonLanguages)
                .ThenInclude(x => x.Language)
                .ToListAsync(cancellationToken);

            var personList = _mapper.Map<List<PersonDto>>(result);

            return personList ?? new List<PersonDto>();
        }
    }
}
