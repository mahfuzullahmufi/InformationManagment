using AutoMapper;
using InformationManagment.Core.Command.LanguageCommand;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.LanguageHandler
{
    public class AddOrUpdateLanguageCommandHandler : IRequestHandler<AddOrUpdateLanguageCommand, int>
    {
        private readonly IRepository<Language> _languageRepository;
        private readonly IMapper _mapper;

        public AddOrUpdateLanguageCommandHandler(IRepository<Language> languageRepository, IMapper mapper)
        {
            _languageRepository = languageRepository;
            _mapper = mapper;
        }

        public async Task<int> Handle(AddOrUpdateLanguageCommand request, CancellationToken cancellationToken)
        {
            ArgumentNullException.ThrowIfNull(request);

            if (string.IsNullOrEmpty(request.Name))
                throw new ArgumentException("Language name is required");

            var language = _mapper.Map<Language>(request);

            if (language.Id > 0)
                _languageRepository.Update(language);
            else
                await _languageRepository.Insert(language);

            await _languageRepository.SaveChangesAsync();

            return language.Id;
        }
    }
}
