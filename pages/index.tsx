import {
  Center,
  Text,
  HStack,
  Spinner,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";
import PaginationComponent from "@/components/Pagination";
import { useCallback, useRef } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import useFormattedTransactions from "@/hooks/useFormattedTransactions";
import TransactionsGroup from "@/components/TransactionsGroup";
import SortingMenu from "@/components/SortingMenu";
import Header from "@/components/Header";

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
      {user && <Header gridArea="header" user={user} />}

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
            <SortingMenu
              sortBy={params.sortBy}
              sortOrder={params.sortOrder}
              onSortOrderChange={(sortOrder) => {
                sortChange({ sortOrder });
              }}
              onSortByChange={(sortBy) => {
                sortChange({ sortBy });
              }}
            />
          </HStack>

          <GridItem gridArea="transactions">
            <Virtuoso
              ref={ref}
              totalCount={formattedTransactions.length}
              itemContent={(index) => (
                <>
                  <TransactionsGroup
                    date={formattedTransactions[index].date}
                    balance={formattedTransactions[index].balance}
                    transactionsList={formattedTransactions[index].transactions}
                  />
                  {index !== formattedTransactions.length - 1 && (
                    <Box boxSize={4} />
                  )}
                </>
              )}
            />
          </GridItem>

          {currentPage && totalPages && (
            <PaginationComponent
              gridArea="pagination"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default TransactionsPage;
