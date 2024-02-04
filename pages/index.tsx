/**
 * TODO:
 * 1. [x] Failed transactions should not be added to the balance + they should be displayed with a strike-through
 * 2. [x] The balance should be displayed in the user's currency
 * 3. [x] Hover effect on the transaction component
 * 4. [x] Colors in the design system
 * 5. [x] Max width text 50ch
 * 6. [x] Fix Layout for the modal
 * 7. [x] Button of sort by
 * 8. [x] Add optimizations (VirtualizedList, cache, etc.)
 * 8.1. Fix API giving transactions in the future
 * 8.2. Add a timeout to the API to simulate a real request
 * 9. Clean up the code
 * 10. Documentations
 * 11. Add tests (unit at least for the hooks)
 * 12. Create the function to download the transaction
 * 13. Animations for the amounts
 */

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
  Spinner,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";
import PaginationComponent from "@/components/Pagination";
import { useCallback, useEffect, useRef } from "react";
import Dinero, { Currency } from "dinero.js";
import IconoirIconProvider from "@/components/IconoirIconProvider";
import { useTransactions } from "@/hooks/useTransactions";
import { GetTransactionsParams } from "@/services/transactionService";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import dayjs from "dayjs";
import TransactionComponent from "@/components/TransactionComponent";
import useFormattedTransactions from "@/hooks/useFormattedTransactions";

const TransactionsPage: React.FC = () => {
  const {
    transactions,
    user,
    isLoading,
    error,
    currentPage,
    totalPages,
    params,
    goToPage,
    sortChange,
  } = useTransactions();
  const formattedTransactions = useFormattedTransactions(transactions || []);

  useEffect(() => {
    console.log("User", user);
  }, [user]);

  const ref = useRef<VirtuosoHandle>(null);
  const handlePageChange = useCallback(
    (page: number) => {
      goToPage(page);
      ref.current?.scrollToIndex({ index: 0, behavior: "smooth" });
    },
    [goToPage, ref]
  );

  if (isLoading) {
    return (
      <Center height="100vh" width="full">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh" width="full">
        <Text>Error: {error.message}</Text>
      </Center>
    );
  }

  return (
    <Grid
      bgColor="background"
      width="full"
      height="full"
      minH="100vh"
      p={8}
      gap={12}
      templateAreas='"header" "body"'
      templateColumns="minmax(320px, 858px)"
      templateRows="auto 1fr"
      justifyContent="center"
    >
      <VStack
        gridArea="header"
        spacing={4}
        width="full"
        height="100%"
        maxW={858}
      >
        {user && (
          <HStack width="full" justify="space-between">
            <HStack spacing={4} alignItems="center" width="full">
              <Avatar name={user.name} />
              <Text textStyle="display">Hello {user.name}!</Text>
            </HStack>
            {user?.balance != null && (
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
      </VStack>
      {transactions && (
        <Grid
          gridArea="body"
          templateAreas='"header" "transactions" "pagination"'
          templateColumns="1fr"
          templateRows="auto 1fr auto"
          width="full"
          gap={4}
        >
          <HStack width="full" justify="space-between" gridArea="header">
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
                  defaultValue={params.sortOrder}
                  title="Order"
                  type="radio"
                  onChange={(value) => {
                    sortChange({
                      sortOrder: value as GetTransactionsParams["sortOrder"],
                    });
                  }}
                >
                  <MenuItemOption value="asc">Ascending</MenuItemOption>
                  <MenuItemOption value="desc">Descending</MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                <MenuOptionGroup
                  defaultValue={params.sortBy}
                  title="Sort by"
                  type="radio"
                  onChange={(value) => {
                    sortChange({
                      sortBy: value as GetTransactionsParams["sortBy"],
                    });
                  }}
                >
                  <MenuItemOption value="createdAt">Date</MenuItemOption>
                  <MenuItemOption value="amount">Amount</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </HStack>

          <GridItem gridArea="transactions">
            <Virtuoso
              ref={ref}
              style={{ width: "100%", height: "100%" }}
              totalCount={formattedTransactions.length}
              itemContent={(index) => {
                const date = formattedTransactions[index].date;
                const transactionsList =
                  formattedTransactions[index].transactions;
                const balance = formattedTransactions[index].balance;

                const getBalanceColor = () => {
                  if (balance.getAmount() === 0) {
                    return undefined;
                  }

                  if (balance.getAmount() > 0) {
                    return "#3E9C42";
                  }

                  return "#9A1111";
                };

                return (
                  <>
                    <Box
                      key={`transaction-date-${date}`}
                      w="full"
                      backgroundColor="surface"
                      borderRadius="xl"
                      padding={4}
                    >
                      <HStack justifyContent="space-between" p={3}>
                        <Text textStyle="label2" opacity="50%">
                          {dayjs(date).format("dddd, D/MM/YYYY")}
                        </Text>
                        <Text
                          textStyle="label"
                          color={getBalanceColor()}
                          paddingRight={12}
                          opacity={balance.getAmount() === 0 ? "50%" : "100%"}
                        >
                          {balance.toFormat()}
                        </Text>
                      </HStack>
                      {transactionsList.map((transaction, transactionIndex) => {
                        return (
                          <TransactionComponent
                            key={`transaction-${transaction.id}`}
                            transaction={transaction}
                            isLast={
                              transactionIndex === transactionsList.length - 1
                            }
                          />
                        );
                      })}
                    </Box>

                    {index !== formattedTransactions.length - 1 && (
                      <Box boxSize={4} />
                    )}
                  </>
                );
              }}
            />
          </GridItem>

          {currentPage && totalPages && (
            <Flex gridArea="pagination" width="full" justify="center">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Flex>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default TransactionsPage;
