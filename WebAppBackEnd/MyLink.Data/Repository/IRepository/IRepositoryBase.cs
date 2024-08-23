﻿
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace MyLink.Data.Repository.IRepository
{
    public interface IRepositoryBase<T> where T : class
    {
        public IEnumerable<T> GetAll();
        public T FirstOrDefault(Expression<Func<T, bool>> filter);
        public void Add(T entity);
        public void Update(T entity);
        public void Delete(T entity);
    }
}