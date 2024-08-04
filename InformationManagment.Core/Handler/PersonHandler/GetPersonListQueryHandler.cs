using AutoMapper;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;
using InformationManagment.Core.Queries.PersonQueries;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.PersonHandler
{
    public class GetPersonListQueryHandler : IRequestHandler<GetPersonListQuery, List<PersonDto>>
    {
        private readonly IRepository<Person> _repository;
        private readonly IMapper _mapper;

        public GetPersonListQueryHandler(IRepository<Person> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<PersonDto>> Handle(GetPersonListQuery request, CancellationToken cancellationToken)
        {
            var result = await _repository.GetAllAsync();
            var personList = _mapper.Map<List<Person>, List<PersonDto>>(result.ToList());
            if (personList is null)
                return new();

            return personList;
        }
    }
}
