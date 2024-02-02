import TransactionsList from "@/components/TransactionsList";
import transactionsData from "../data/transactionsData.json";

import {
  Avatar,
  Box,
  Center,
  Flex,
  VStack,
  Text,
  Grid,
} from "@chakra-ui/react";
import { Transaction } from "@/interfaces";
import PaginationComponent from "@/components/Pagination";
import { start } from "repl";

const mockTransactions = transactionsData.transactions as Transaction[];
const user = transactionsData.transactions[0].user;

const TransactionsPage: React.FC = () => {
  return (
    <Center bgColor="#F7F7F7" minH="100vh">
      <Grid
        templateRows="auto 1fr auto"
        gap={14}
        justifyItems="center"
        width="full"
        maxW={858}
      >
        <Grid
          templateColumns="auto 1fr"
          gap={4}
          alignItems="center"
          width="full"
          justifyContent="start"
          marginTop={14}
        >
          <Avatar name={user.name} />
          <Text textStyle="display">Hello {user.name}!</Text>
        </Grid>

        <Grid gap={6}>
          <Text textStyle="title">Transactions</Text>

          <TransactionsList transactions={mockTransactions} />

          <Flex width="full" justify="center">
            <PaginationComponent
              currentPage={1}
              totalPages={10}
              onPageChange={() => {}}
            />
          </Flex>
        </Grid>
      </Grid>
    </Center>
  );
};

export default TransactionsPage;
