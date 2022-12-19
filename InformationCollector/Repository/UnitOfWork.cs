using InformationCollector.Data;
using InformationCollector.IRepository;
using InformationCollector.Models;

namespace InformationCollector.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DatabaseContext _context;
        private IGenericRepository<Information> _informations;
        private IGenericRepository<Country> _countries;
        private IGenericRepository<City> _cities;

        public UnitOfWork(DatabaseContext context)
        {
            _context = context;
        }
        public IGenericRepository<Information> Informations => _informations ??= new GenericRepository<Information>(_context);

        public IGenericRepository<Country> Countries => _countries ??= new GenericRepository<Country>(_context);

        public IGenericRepository<City> Cities => _cities ??= new GenericRepository<City>(_context);

        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
