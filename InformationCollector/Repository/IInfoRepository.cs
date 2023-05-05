using InformationCollector.Models;

namespace InformationCollector.Repository
{
    public interface IInfoRepository
    {
        Task<bool> CreateInfoAsync(CreateInfoDTO model);
    }
}
