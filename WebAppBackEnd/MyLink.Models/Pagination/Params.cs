

namespace MyLink.Models.Pagination
{
    public class Params
    {
        public int PageNumber { get; set; } = 1;
        private const int maxPageSize = 20;
        
        private int _pageSize = 10;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > maxPageSize ? maxPageSize : value;
        }
    }    
}

