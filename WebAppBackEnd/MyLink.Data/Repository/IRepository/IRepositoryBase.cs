
using Microsoft.AspNetCore.Mvc;

namespace MyLink.Data.Repository.IRepository
{
    public interface IRepositoryBase<T> where T : class
    {
        public IEnumerable<T> GetAll();
        public void Add(T entity);
        public void Update(T entity);
        public void Delete(T entity);
    }
}
