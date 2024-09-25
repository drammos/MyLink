// Metadata object structure
class Metadata {
    constructor(currentPage, totalPages, pageSize, totalCount) {
        currentPage,
        totalPages,
        pageSize,
        totalCount
    };
}

  // PaginatedResponse class
class PaginatedResponse {
    constructor(items, metadata) {
        this.items = items;
        this.metadata = metadata;
    }
}
  