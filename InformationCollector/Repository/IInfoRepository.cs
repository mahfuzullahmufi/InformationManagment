using InformationCollector.Models;

namespace InformationCollector.Repository
{
    public interface IInfoRepository
    {
        Task<bool> CreateInfoAsync(CreateInfoDTO model);
        Task<List<InformationDTO>> GetAllInformation();
        Task<InformationDTO> GetInformationById(int id);
        Task<bool> UpdateInfoAsync(int id, InformationDTO info);
        Task<bool> DeleteInformation(int id);
    }
}
