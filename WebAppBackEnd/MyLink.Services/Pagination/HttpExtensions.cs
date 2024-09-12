using Microsoft.AspNetCore.Http;
using System.Text.Json;
using MyLink.Models.Pagination;

namespace MyLink.Services.Pagination
{
    public static class Httpxtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, Metadata metaData)
        {
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
