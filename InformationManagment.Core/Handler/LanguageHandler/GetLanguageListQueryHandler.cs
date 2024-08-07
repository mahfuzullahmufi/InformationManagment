using AutoMapper;
using InformationManagment.Core.Entities;
using InformationManagment.Core.Models;
using InformationManagment.Core.Queries.LanguageQueries;
using InformationManagment.Core.Repository.Interfaces;
using MediatR;

namespace InformationManagment.Core.Handler.LanguageHandler
{
    public class GetLanguageListQueryHandler : IRequestHandler<GetLanguageListQuery, List<LanguageDto>>
    {
        private readonly IRepository<Language> _languageRepository;
        private readonly IMapper _mapper;

        public GetLanguageListQueryHandler(IRepository<Language> languageRepository, IMapper mapper)
        {
            _languageRepository = languageRepository;
            _mapper = mapper;
        }

        public async Task<List<LanguageDto>> Handle(GetLanguageListQuery request, CancellationToken cancellationToken)
        {
            var result = await _languageRepository.GetsAsync();
            if (result is null)
                return new List<LanguageDto>();

            return _mapper.Map<List<LanguageDto>>(result);
        }
    }
}
