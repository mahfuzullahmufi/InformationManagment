using AutoMapper;
using InformationManagment.Core.Command.PersonCommand;
using InformationManagment.Core.DbContext;
using InformationManagment.Core.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InformationManagment.Core.Handler.PersonHandler
{
    public class AddOrUpdatePersonCommandHandler : IRequestHandler<AddOrUpdatePersonCommand, int>
    {
        private readonly DatabaseContext _dbContext;
        private readonly IMapper _mapper;

        public AddOrUpdatePersonCommandHandler(DatabaseContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<int> Handle(AddOrUpdatePersonCommand request, CancellationToken cancellationToken)
        {
            ArgumentNullException.ThrowIfNull(request);

            if (string.IsNullOrEmpty(request.Name))
                throw new ArgumentException("Person name is required");

            var person = _mapper.Map<Person>(request);
            person.PersonLanguages ??= new List<PersonLanguage>();

            if (person.Id > 0)
                _dbContext.Update(person);
            else
                await _dbContext.Persons.AddAsync(person, cancellationToken);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return person.Id;
        }
    }
}
