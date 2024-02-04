import transactionsService, {
  TransactionsResponse,
  type GetTransactionsParams,
} from "@/services/transactionService";
import useSWR from "swr";
import { useState, useCallback } from "react";

export function useTransactions(initialParams: GetTransactionsParams = {}) {
  const [params, setParams] = useState<GetTransactionsParams>({
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
    ({
      sortBy,
      sortOrder,
    }: {
      sortBy?: GetTransactionsParams["sortBy"];
      sortOrder?: GetTransactionsParams["sortOrder"];
    }) => {
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
