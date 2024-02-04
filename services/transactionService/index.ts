import type { Transaction, User } from "@/interfaces";

export interface GetTransactionsParams {
  page?: number;
  sortBy?: keyof Transaction;
  sortOrder?: "asc" | "desc";
}

export type PaginatedResponse<T> = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  data: T;
};

export type TransactionsResponse = PaginatedResponse<{
  user: User;
  transactions: Transaction[];
}>;

export interface TransactionsService {
  get: (params?: GetTransactionsParams) => Promise<TransactionsResponse>;
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
