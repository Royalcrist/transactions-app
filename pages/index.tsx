import { TransactionsList } from "../components/TransactionComponent";
import transactionsData from "../data/transactionsData.json";

import {
  Avatar,
  Box,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Transaction } from "@/interface/ transaction";
import PaginationComponent from "@/components/Pagination";

const mockTransactions: Transaction[] = transactionsData.transactions;
const user = transactionsData.transactions[0].user;

const TransactionsPage: React.FC = () => {
  return (
    <Center bgColor="#F7F7F7" minH="100vh">
      <VStack spacing="24px" align="stretch" maxW="858px">
        <Flex justify="start" align="center" marginTop="60px">
          <Avatar marginRight="16px" name={user.name} src={user.avatar} />
          <Text textStyle="display">Hello {user.name}!</Text>
        </Flex>
        <Flex justify="start" align="center" marginTop="60px">
          <Text textStyle="title">Transactions</Text>
        </Flex>

        <Box bg="white" borderRadius="12px" p="16px" boxShadow="sm" w="full">
          <TransactionsList transactions={mockTransactions} />
        </Box>

        <Flex justify="center" align="center" mt="12px">
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
