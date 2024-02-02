import TransactionsList from "@/components/TransactionsList";
import transactionsData from "../data/transactionsData.json";

import { Avatar, Box, Center, Flex, VStack, Text } from "@chakra-ui/react";
import { Transaction } from "@/interfaces";
import PaginationComponent from "@/components/Pagination";

const mockTransactions = transactionsData.transactions as Transaction[];
const user = transactionsData.transactions[0].user;

const TransactionsPage: React.FC = () => {
  return (
    <Center bgColor="#F7F7F7" minH="100vh">
      <VStack spacing={6} align="stretch" maxW="858px">
        <Flex justify="start" align="center" marginTop={15}>
          <Avatar marginRight={4} name={user.name} />
          <Text textStyle="display">Hello {user.name}!</Text>
        </Flex>
        <Flex justify="start" align="center" marginTop={15}>
          <Text textStyle="title">Transactions</Text>
        </Flex>

        <TransactionsList transactions={mockTransactions} />

        <Flex justify="center" align="center" mt={3}>
          <PaginationComponent
            currentPage={1}
            totalPages={10}
            onPageChange={() => {}}
          />
        </Flex>
      </VStack>
    </Center>
  );
};

export default TransactionsPage;
