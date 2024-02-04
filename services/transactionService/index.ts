import type { PaginationParams, TransactionsResponse } from "@/interfaces";
export interface TransactionsService {
  get: (params?: PaginationParams) => Promise<TransactionsResponse>;
}

const transactionsService: TransactionsService = {
  get: async ({ page = 1, sortBy = "createdAt", sortOrder = "desc" } = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      sortBy,
      sortOrder,
    });
    const response = await fetch(`/api/transactions?${params}`);
    return response.json();
  },
};

export default transactionsService;
