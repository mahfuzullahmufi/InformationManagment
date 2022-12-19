
using InformationCollector.Models;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;


namespace InformationCollector.IRepository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IList<T>> GetAll(
            Expression<Func<T, bool>> expression = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null
         );

        Task<T> Get(Expression<Func<T, bool>> expression, List<string> includes = null);
        Task Insert(T entity);
        Task Delete(int id);
        void Update(T entity);
    }
}