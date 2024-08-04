using AutoMapper;
using InformationManagment.Core.Command.PersonCommand;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.PersonHandler
{
    public class AddOrUpdatePersonCommandHandler : IRequestHandler<AddOrUpdatePersonCommand, int>
    {
        private readonly IRepository<Person> _personRepository;
        private readonly IRepository<Language> _languageRepository;
        private readonly IMapper _mapper;

        public AddOrUpdatePersonCommandHandler(IRepository<Person> personRepository, IRepository<Language> languageRepository, IMapper mapper)
        {
            _personRepository = personRepository;
            _languageRepository = languageRepository;
            _mapper = mapper;
        }

        public async Task<int> Handle(AddOrUpdatePersonCommand request, CancellationToken cancellationToken)
        {
            var person = _mapper.Map<PersonDto, Person>(request);

            if (person.PersonLanguages != null)
            {
                var languages = await _languageRepository.GetByIdsAsync(request.PersonLanguages.Select(l => l.Id));
                foreach (var language in languages)
                {
                    person.PersonLanguages.Add(new PersonLanguage
                    {
                        Person = person,
                        Language = language
                    });
                }
            }

            await _personRepository.Insert(person);
            await _personRepository.SaveChangesAsync();

            return person.Id;
        }
    }
}
