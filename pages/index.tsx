/**
 * TODO:
 * 1. Failed transactions should not be added to the balance + they should be displayed with a strike-through
 * 2. The balance should be displayed in the user's currency
 * 3. Hover effect on the transaction component
 * 4. Colors in the design system
 * 5. Max width text 50ch
 * 6. Fix Layout for the modal
 * 7. Button of sort by
 * 8. Add optimizations (VirtualizedList, cache, etc.)
 * 9. Clean up the code
 * 10. Add tests (unit at least for the hooks)
 * 11. Create the function to download the transaction
 */

import TransactionsList from "@/components/TransactionsList";
import transactionsData from "../data/transactionsData.json";

import { Avatar, Center, Flex, VStack, Text, HStack } from "@chakra-ui/react";
import { Transaction } from "@/interfaces";
import PaginationComponent from "@/components/Pagination";
import { useEffect, useState } from "react";

const user = transactionsData.transactions[0].user;

interface GetTransactionsParams {
  page?: number;
  sortBy?: keyof Transaction;
  sortOrder?: "asc" | "desc";
}

type PaginatedResponse<T> = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  data: T;
};

interface TransactionsService {
  get: (params?: GetTransactionsParams) => Promise<
    PaginatedResponse<{
      balance: string;
      balanceCurrency: string;
      transactions: Transaction[];
    }>
  >;
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

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [balance, setBalance] = useState("0.00");

  useEffect(() => {
    transactionsService.get().then((response) => {
      setTransactions(response.data.transactions);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
      setBalance(response.data.balance);
    });
  }, []);

  const handlePageChange = (page: number) => {
    transactionsService.get({ page }).then((response) => {
      setTransactions(response.data.transactions);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
      setBalance(response.data.balance);

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <Center bgColor="#F7F7F7" minH="100vh">
      <VStack spacing={14} width="full" maxW={858} py={16}>
        <HStack spacing={4} alignItems="center" width="full">
          <Avatar name={user.name} />
          <Text textStyle="display">Hello {user.name}!</Text>
        </HStack>

        <VStack spacing={12}>
          <VStack spacing={6} width="full">
            <Text textStyle="title" width="full">
              Transactions
            </Text>
            <TransactionsList transactions={transactions} />
          </VStack>

          <Flex width="full" justify="center">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Flex>
        </VStack>
      </VStack>
    </Center>
  );
};

export default TransactionsPage;
