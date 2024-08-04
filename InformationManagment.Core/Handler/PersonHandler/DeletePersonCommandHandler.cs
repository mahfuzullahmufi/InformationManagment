using InformationManagment.Core.Command.PersonCommand;
using InformationManagment.Core.DbContext;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace InformationManagment.Core.Handler.PersonHandler
{
    public class DeletePersonCommandHandler : IRequestHandler<DeletePersonCommand, bool>
    {
        private readonly DatabaseContext _context;

        public DeletePersonCommandHandler(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeletePersonCommand request, CancellationToken cancellationToken)
        {
            var person = await _context.Persons
                .Include(p => p.PersonLanguages)
                .FirstOrDefaultAsync(p => p.Id == request.Id);

            if (person is not null)
            {
                _context.PersonLanguages.RemoveRange(person.PersonLanguages);
                _context.Persons.Remove(person);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}
