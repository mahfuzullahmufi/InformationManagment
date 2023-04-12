
using InformationCollector.Data;
using InformationCollector.IRepository;
using InformationCollector.Models;

namespace InformationCollector.IRepository
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Information> Informations { get; }
        IGenericRepository<Country> Countries { get; }
        IGenericRepository<City> Cities { get; }
        IGenericRepository<Language> Languages { get; }

        Task Save();
    }
}
