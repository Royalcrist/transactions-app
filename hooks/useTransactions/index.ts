import transactionsService from "@/services/transactionService";
import useSWR from "swr";
import { useState, useCallback } from "react";
import type {
  PaginationParams,
  SortBy,
  SortOrder,
  TransactionsResponse,
} from "@/interfaces";

export function useTransactions(initialParams: PaginationParams = {}) {
  const [params, setParams] = useState<PaginationParams>({
    ...initialParams,
    page: initialParams.page || 1,
    sortBy: initialParams.sortBy || "createdAt",
    sortOrder: initialParams.sortOrder || "desc",
  });

  // Generate the SWR key
  const paramsKey = JSON.stringify(params);

  const { data, error, mutate } = useSWR<TransactionsResponse>(
    paramsKey,
    () => transactionsService.get(params),
    {
      revalidateOnFocus: false,
    }
  );

  const goToPage = useCallback((page: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page,
    }));
  }, []);

  const sortChange = useCallback(
    ({ sortBy, sortOrder }: { sortBy?: SortBy; sortOrder?: SortOrder }) => {
      if (!sortBy && !sortOrder) {
        throw new Error("Either sortBy or sortOrder are required");
      }

      setParams((prevParams) => ({
        ...prevParams,
        page: 1,
        sortBy: sortBy || prevParams.sortBy,
        sortOrder: sortOrder || prevParams.sortOrder,
      }));
    },
    []
  );

  return {
    params,
    transactions: data?.data.transactions,
    user: data?.data.user,
    isLoading: !error && !data,
    error,
    currentPage: data?.currentPage,
    totalPages: data?.totalPages,
    refresh: mutate,
    goToPage,
    sortChange,
  };
}
