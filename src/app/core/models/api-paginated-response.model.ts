export interface PaginationMeta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  meta: PaginationMeta;
  data: T[];
}
