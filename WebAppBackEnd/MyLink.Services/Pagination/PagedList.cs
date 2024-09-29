using Microsoft.EntityFrameworkCore;
using MyLink.Models.Pagination;
namespace MyLink.Services.Pagination
{
    public class PagedList<T> : List<T>
    {
        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            Metadata = new Metadata
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };
            AddRange(items);
        }
        public Metadata Metadata { get; set; }

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize)
        {
            var count = await GetCountAsync(query);
            var items = await GetPageAsync(query, pageNumber, pageSize);
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
        
        public static PagedList<T> ToPagedListInMemory(IQueryable<T> query, int pageNumber, int pageSize)
        {
            var count = GetCount(query);
            var items = GetPage(query, pageNumber, pageSize);
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }

        private static async Task<int> GetCountAsync(IQueryable<T> query)
        {
            if (query is IAsyncEnumerable<T>)
                return await query.CountAsync();
            else
                return query.Count();
        }

        private static async Task<List<T>> GetPageAsync(IQueryable<T> query, int pageNumber, int pageSize)
        {
            query = query.Skip((pageNumber - 1) * pageSize).Take(pageSize);
            if (query is IAsyncEnumerable<T>)
                return await query.ToListAsync();
            else
                return query.ToList();
        }

        private static int GetCount(IQueryable<T> query)
        {
            return query.Count();
        }

        private static List<T> GetPage(IQueryable<T> query, int pageNumber, int pageSize)
        {
            return query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
        }
    }
}