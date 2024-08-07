using AutoMapper;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;
using InformationManagment.Core.Queries.LanguageQueries;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.LanguageHandler
{
    public class GetLanguageByIdQueryHandler : IRequestHandler<GetLanguageByIdQuery, LanguageDto>
    {
        private readonly IRepository<Language> _languageRepository;
        private readonly IMapper _mapper;

        public GetLanguageByIdQueryHandler(IRepository<Language> languageRepository, IMapper mapper)
        {
            _languageRepository = languageRepository;
            _mapper = mapper;
        }

        public async Task<LanguageDto> Handle(GetLanguageByIdQuery request, CancellationToken cancellationToken)
        {
            var language = await _languageRepository.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (language is null)
                return new LanguageDto();

            return _mapper.Map<LanguageDto>(language);
        }
    }
}
