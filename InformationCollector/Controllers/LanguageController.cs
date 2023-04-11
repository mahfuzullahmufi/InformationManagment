using AutoMapper;
using InformationCollector.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InformationCollector.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILogger<InformationController> _logger;
        public LanguageController(IUnitOfWork unitOfWork, ILogger<InformationController> logger, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("get-all-language")]
        public async Task<IActionResult> GetLanguages()
        {
            var languages = await _unitOfWork.Languages.GetAll();
            return Ok(languages);
        }
    }
}
