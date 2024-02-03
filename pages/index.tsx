/**
 * TODO:
 * 1. [x] Failed transactions should not be added to the balance + they should be displayed with a strike-through
 * 2. [x] The balance should be displayed in the user's currency
 * 3. [x] Hover effect on the transaction component
 * 4. [x] Colors in the design system
 * 5. [x] Max width text 50ch
 * 6. [x] Fix Layout for the modal
 * 7. [x] Button of sort by
 * 8. Add optimizations (VirtualizedList, cache, etc.)
 * 9. Clean up the code
 * 10. Documentations
 * 11. Add tests (unit at least for the hooks)
 * 12. Create the function to download the transaction
 * 13. Animations for the amounts
 */

import TransactionsList from "@/components/TransactionsList";
import {
  Avatar,
  Center,
  Flex,
  VStack,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { Transaction, User } from "@/interfaces";
import PaginationComponent from "@/components/Pagination";
import { useCallback, useEffect, useState } from "react";
import Dinero, { Currency } from "dinero.js";
import IconoirIconProvider from "@/components/IconoirIconProvider";

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

interface TransactionsResponse {
  transactions: Transaction[];
  user: User;
}

interface TransactionsService {
  get: (
    params?: GetTransactionsParams
  ) => Promise<PaginatedResponse<TransactionsResponse>>;
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
  const [user, setUser] = useState<User | undefined>();
  const [sortBy, setSortBy] = useState<keyof Transaction>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const setTransactionsState = (
    response: PaginatedResponse<TransactionsResponse>
  ) => {
    setTransactions(response.data.transactions);
    setCurrentPage(response.currentPage);
    setTotalPages(response.totalPages);
    setUser(response.data.user);
  };

  useEffect(() => {
    transactionsService.get().then(setTransactionsState);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      transactionsService.get({ page, sortBy, sortOrder }).then((response) => {
        setTransactionsState(response);

        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
    [sortBy, sortOrder]
  );

  const handleSortChange = (
    sortBy: keyof Transaction,
    sortOrder: "asc" | "desc"
  ) => {
    transactionsService.get({ sortBy, sortOrder }).then(setTransactionsState);

    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  return (
    <Center bgColor="background" minH="100vh">
      <VStack spacing={14} width="full" maxW={858} py={16}>
        {user && (
          <HStack width="full" justify="space-between">
            <HStack spacing={4} alignItems="center" width="full">
              <Avatar name={user.name} />
              <Text textStyle="display">Hello {user.name}!</Text>
            </HStack>
            {user.balance && (
              <Text textStyle="title" whiteSpace="nowrap">
                Balance:{" "}
                {Dinero({
                  amount: Number(user.balance) * 100,
                  currency: user.currency as Currency,
                }).toFormat()}
              </Text>
            )}
          </HStack>
        )}

        {transactions && (
          <VStack spacing={12}>
            <VStack spacing={6} width="full">
              <HStack width="full" justify="space-between">
                <Text textStyle="title" width="full">
                  Transactions
                </Text>

                <Menu closeOnSelect={false}>
                  <MenuButton
                    as={Button}
                    variant="secondary"
                    size="xs"
                    colorScheme="blue"
                    leftIcon={<IconoirIconProvider icon="Sort" />}
                  >
                    Sort
                  </MenuButton>
                  <MenuList minWidth="240px">
                    <MenuOptionGroup
                      defaultValue="desc"
                      title="Order"
                      type="radio"
                      onChange={(value) => {
                        handleSortChange(sortBy, value as "asc" | "desc");
                      }}
                    >
                      <MenuItemOption value="asc">Ascending</MenuItemOption>
                      <MenuItemOption value="desc">Descending</MenuItemOption>
                    </MenuOptionGroup>
                    <MenuDivider />
                    <MenuOptionGroup
                      defaultValue="createdAt"
                      title="Sort by"
                      type="radio"
                      onChange={(value) => {
                        handleSortChange(value as keyof Transaction, sortOrder);
                      }}
                    >
                      <MenuItemOption value="createdAt">Date</MenuItemOption>
                      <MenuItemOption value="amount">Amount</MenuItemOption>
                    </MenuOptionGroup>
                  </MenuList>
                </Menu>
              </HStack>
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
        )}
      </VStack>
    </Center>
  );
};

export default TransactionsPage;
