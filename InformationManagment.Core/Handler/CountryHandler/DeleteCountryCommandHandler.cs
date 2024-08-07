using InformationManagment.Core.Command.CountryCommand;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.CountryHandler
{
    public class DeleteCountryCommandHandler : IRequestHandler<DeleteCountryCommand, bool>
    {
        private readonly IRepository<Country> _countryRepository;

        public DeleteCountryCommandHandler(IRepository<Country> countryRepository)
        {
            _countryRepository = countryRepository;
        }

        public async Task<bool> Handle(DeleteCountryCommand request, CancellationToken cancellationToken)
        {
            var country = await _countryRepository.GetByIdAsync(request.Id);
            if (country is null)
                return false;

            await _countryRepository.Delete(request.Id);
            await _countryRepository.SaveChangesAsync();

            return true;
        }
    }
}
