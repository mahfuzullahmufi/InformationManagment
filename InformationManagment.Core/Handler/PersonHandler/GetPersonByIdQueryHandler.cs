using AutoMapper;
using InformationManagment.Core.DbContext;
using InformationManagment.Core.Models;
using InformationManagment.Core.Queries.PersonQueries;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InformationManagment.Core.Handler.PersonHandler
{
    public class GetPersonByIdQueryHandler : IRequestHandler<GetPersonByIdQuery, PersonDto>
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public GetPersonByIdQueryHandler(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public async Task<PersonDto> Handle(GetPersonByIdQuery request, CancellationToken cancellationToken)
        {
            var person = await _databaseContext.Persons
                .Include(i => i.PersonLanguages)
                .ThenInclude(t => t.Language)
                .SingleOrDefaultAsync(x => x.Id == request.Id)
                .ConfigureAwait(false);

            if (person is null)
                return new PersonDto();

            return _mapper.Map<PersonDto>(person);
        }
    }
}
