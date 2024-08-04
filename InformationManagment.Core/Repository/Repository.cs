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

    public async Task<List<T>> GetAllAsync()
    {
        return  await _db.AsNoTracking().ToListAsync();
    }

    public async Task<List<T>> GetsAsync(params Expression<Func<T, object>>[] includes)
    {
        IQueryable<T> query = _db;
        foreach (var include in includes)
        {
            query = query.Include(include);
        }
        return await query.ToListAsync();
    }

    public async Task<List<T>> GetsAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
    {
        IQueryable<T> query = _db;
        foreach (var include in includes)
        {
            query = query.Include(include);
        }
        return await query.Where(predicate).ToListAsync();
    }

    public async Task<List<T>> GetsAsync(Expression<Func<T, bool>> predicate,
        Func<IQueryable<T>, IOrderedQueryable<T>> orderBy,
        params Expression<Func<T, object>>[] includes)
    {
        IQueryable<T> query = _db;
        foreach (var include in includes)
        {
            query = query.Include(include);
        }
        query = query.Where(predicate);
        return await orderBy(query).ToListAsync();
    }

    public async Task<T?> GetByIdAsync(int id)
    {
        return await _db.FindAsync(id);
    }

    public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
    {
        IQueryable<T> query = _db;
        foreach (var include in includes)
        {
            query = query.Include(include);
        }
        return await query.FirstOrDefaultAsync(predicate);
    }

    public async Task Insert(T entity)
    {
        await _db.AddAsync(entity);
    }

    public void Update(T entity)
    {
        _db.Attach(entity);
        _context.Entry(entity).State = EntityState.Modified;
    }

    public async Task<List<T>> UpdateListAsync(List<T> entityList)
    {
        foreach (T item in entityList)
        {
            _db.Attach(item);
            _context.Entry(item).State = EntityState.Modified;
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
