﻿using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyLink.Data.Access;
using MyLink.Data.Repository.IRepository;
using System.Linq.Expressions;

namespace MyLink.Data.Repository
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected readonly ApplicationDbContext _context;
        protected DbSet<T> dbSet;

        public RepositoryBase(ApplicationDbContext context)
        {
            _context = context;
            dbSet = context.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            return dbSet.ToList<T>();
        }

        public T FirstOrDefault(Expression<Func<T, bool>> filter)
        {
            IQueryable<T> queryFromDbSet = dbSet.Where(filter);
            return queryFromDbSet.FirstOrDefault();
        }

        public void Add(T entity)
        {
            dbSet.Add(entity);
        }

        public void Update(T entity)
        {
            dbSet.Update(entity);
        }

        public void Delete(T entity)
        {
            dbSet.Remove(entity);
        }
    }
}