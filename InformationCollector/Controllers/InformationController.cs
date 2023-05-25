using AutoMapper;
using InformationCollector.IRepository;
using InformationCollector.Models;
using InformationCollector.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Net;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace InformationCollector.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InformationController : ControllerBase
    {
        //public readonly IGenericRepository<Information> _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILogger<InformationController> _logger;
        private readonly IInfoRepository _infoRepository;
        public InformationController(IUnitOfWork unitOfWork, ILogger<InformationController> logger, IMapper mapper, IInfoRepository infoRepository)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
            _infoRepository = infoRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetInformations()
        {
            //var infos = await _unitOfWork.Informations.GetAll();
            var infos = await _infoRepository.GetAllInformation();
            return Ok(infos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInformation(int id)
        {
            //var info = await _unitOfWork.Informations.Get(q => q.Id == id, new List<string> { });
            var info = await _infoRepository.GetInformationById(id);
            return Ok(info);
        }

        [HttpPost]
        public async Task<IActionResult> CreateInformation([FromBody] CreateInfoDTO information)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogError($"Invalid POST attempt in {nameof(CreateInformation)}");
                return BadRequest(ModelState);
            }

            //await _unitOfWork.Informations.Insert(information);
            //await _unitOfWork.Save();

            //return CreatedAtRoute(new { id = information.Id }, information);

            try
            {
                var createInfo = await _infoRepository.CreateInfoAsync(information);
                return Ok(createInfo);
                
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateInformation(int id, InformationDTO info)
        {
            if (!ModelState.IsValid || id < 1)
            {
                _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateInformation)}");
                return BadRequest(ModelState);
            }


            //info.Id = id;
            //if (info == null)
            //{
            //    _logger.LogError($"Invalid UPDATE attempt in {nameof(UpdateInformation)}");
            //    return BadRequest("Submitted data is invalid");
            //}

            //_unitOfWork.Informations.Update(info);
            //await _unitOfWork.Save();
            //return Ok(info);
            var updateInfo = await _infoRepository.UpdateInfoAsync(id,info);
            return Ok(updateInfo);
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteInformation(int id)
        {
            if (id < 1)
            {
                _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteInformation)}");
                return BadRequest();
            }

            //var info = await _unitOfWork.Informations.Get(q => q.Id == id);
            //if (info == null)
            //{
            //    _logger.LogError($"Invalid DELETE attempt in {nameof(DeleteInformation)}");
            //    return BadRequest("Submitted data is invalid");
            //}

            //await _unitOfWork.Informations.Delete(id);
            //await _unitOfWork.Save();
            //return NoContent();

            var result = await _infoRepository.DeleteInformation(id);
            return Ok(result);

        }

    }
}
