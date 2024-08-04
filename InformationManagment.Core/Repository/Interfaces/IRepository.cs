using System.Linq.Expressions;


namespace InformationManagment.Core.Repository.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<List<T>> GetAllAsync();
        Task<List<T>> GetsAsync(params Expression<Func<T, object>>[] includes);
        Task<List<T>> GetsAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes);
        Task<List<T>> GetsAsync(Expression<Func<T, bool>> predicate,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy,
            params Expression<Func<T, object>>[] includes);
        Task<T> GetByIdAsync(int id);
        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes);
        Task Insert(T entity);
        void Update(T entity);
        Task<List<T>> UpdateListAsync(List<T> entityList);
        Task<bool> Delete(int id);
        Task SaveChangesAsync();
    }
}