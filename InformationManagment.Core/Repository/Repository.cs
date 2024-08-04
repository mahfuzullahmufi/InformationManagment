using InformationManagment.Core.DbContext;
using InformationManagment.Core.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace InformationManagment.Core.Repository;

public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DatabaseContext _context;
        private readonly DbSet<T> _db;

        public Repository(DatabaseContext context)
        {
            _context = context;
            _db = _context.Set<T>();
        }

        public async Task<IList<T>> GetAllAsync()
        {
            IQueryable<T> query = _db;

            return await query.AsNoTracking().ToListAsync();
        }

        public async Task<List<T>> GetsAsync(params Expression<Func<T, object>>[] includes)
        {
            return await includes
                .Aggregate(
                   _db.AsQueryable(),
                    (current, include) => current.Include(include)
                ).ToListAsync();
        }

        public async Task<List<T>> GetsAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            return await includes
               .Aggregate(
                   _db.AsQueryable(),
                   (current, include) => current.Include(include),
                  c => c.Where(predicate)
               ).ToListAsync().ConfigureAwait(false);
        }

        public async Task<List<T>> GetsAsync(Expression<Func<T, bool>> predicate,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy,
            params Expression<Func<T, object>>[] includes)
        {
            return await orderBy(includes
               .Aggregate(
                   _db.AsQueryable(),
                   (current, include) => current.Include(include),
                  c => c.Where(predicate))
               ).ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await _db.FindAsync(id);
        }

        public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            return await includes
               .Aggregate(_db.AsQueryable(),
               (current, include) => current.Include(include),
               c => c.FirstOrDefaultAsync(predicate)).ConfigureAwait(false);
        }

        public async Task Insert(T entity)
        {
            await _db.AddAsync(entity);
        }

        public async Task Update(T entity)
        {
            _db.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public virtual async Task<List<T>> UpdateListAsync(List<T> entityList)
        {
            foreach (T item in entityList)
            {
                _db.Entry(item).State = EntityState.Modified;
            }
            return entityList;
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _db.FindAsync(id);
            if (entity != null)
            {
                _db.Remove(entity);
                return true;
            }
            return false;
        }

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }
    }

