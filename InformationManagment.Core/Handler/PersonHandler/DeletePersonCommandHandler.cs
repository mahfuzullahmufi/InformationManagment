using InformationManagment.Core.Command.PersonCommand;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.PersonHandler
{
    public class DeletePersonCommandHandler : IRequestHandler<DeletePersonCommand, bool>
    {
        private readonly IRepository<Person> _repository;

        public DeletePersonCommandHandler(IRepository<Person> repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(DeletePersonCommand request, CancellationToken cancellationToken)
        {
            var result = await _repository.GetByIdAsync(request.Id);
            if (result is null)
                return false;

            await _repository.Delete(request.Id);
            await _repository.SaveChangesAsync();

            return true;
        }
    }
}
