using InformationManagment.Core.Command.LanguageCommand;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.LanguageHandler
{
    public class DeleteLanguageCommandHandler : IRequestHandler<DeleteLanguageCommand, bool>
    {
        private readonly IRepository<Language> _languageRepository;

        public DeleteLanguageCommandHandler(IRepository<Language> languageRepository)
        {
            _languageRepository = languageRepository;
        }

        public async Task<bool> Handle(DeleteLanguageCommand request, CancellationToken cancellationToken)
        {
            var language = await _languageRepository.GetByIdAsync(request.Id);
            if (language == null)
                return false;

            await _languageRepository.Delete(request.Id);
            await _languageRepository.SaveChangesAsync();

            return true;
        }
    }
}
