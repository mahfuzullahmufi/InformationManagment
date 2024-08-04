using AutoMapper;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;
using InformationManagment.Core.Queries.PersonQueries;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.PersonHandler
{
    public class GetPersonByIdQueryHandler : IRequestHandler<GetPersonByIdQuery, PersonDto>
    {
        private readonly IRepository<Person> _personRepository;
        private readonly IMapper _mapper;

        public GetPersonByIdQueryHandler(IRepository<Person> personRepository, IMapper mapper)
        {
            _personRepository = personRepository;
            _mapper = mapper;
        }

        public async Task<PersonDto> Handle(GetPersonByIdQuery request, CancellationToken cancellationToken)
        {
            var person = await _personRepository.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (person is null)
                return new();

            return _mapper.Map<Person, PersonDto>(person);
        }
    }
}
