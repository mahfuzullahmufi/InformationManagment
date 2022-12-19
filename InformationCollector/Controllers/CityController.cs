using AutoMapper;
using InformationCollector.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InformationCollector.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILogger<InformationController> _logger;
        public CityController(IUnitOfWork unitOfWork, ILogger<InformationController> logger, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
        }

        public async Task<IActionResult> GetCities()
        {
            var cities = await _unitOfWork.Cities.GetAll();
            return Ok(cities);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCountry(int id)
        {
            var city = await _unitOfWork.Cities.Get(q => q.Id == id, new List<string> { });
            return Ok(city);
        }
    }
}
