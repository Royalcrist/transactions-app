import {
  Flex,
  Text,
  Box,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { Transaction } from "@/interface/ transaction";
import { ArrowRight, CartAlt, Download } from "iconoir-react";
import dayjs from "dayjs";
import { useDisclosure } from "@chakra-ui/react";

interface TransactionProps {
  transaction: Transaction;
  isLast: boolean;
  showDateAndBalance: boolean;
}

const TransactionComponent: React.FC<TransactionProps> = ({
  transaction,
  isLast,
  showDateAndBalance,
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {showDateAndBalance && (
        <Flex justify="space-between" p="12px" width="full">
          <Text textStyle="label2" opacity="50%">
            {dayjs(transaction.date).format("dddd, D/MM/YYYY")}
          </Text>
          <Text
            marginRight="88px"
            textStyle="label"
            color={parseFloat(transaction.balance) > 0 ? "#3E9C42" : "#9A1111"}
          >
            {parseFloat(transaction.balance) > 0 ? "+" : "-"}
            {transaction.currency}
            {Math.abs(parseFloat(transaction.balance))}
          </Text>
        </Flex>
      )}
      <Box
        borderBottomWidth={isLast ? "0px" : "1px"}
        borderColor={borderColor}
        p="12px"
        width="full"
      >
        <Flex align="center" gap="48px">
          <VStack align="start" minW="110px">
            <Text>{dayjs(transaction.date).format("HH:mmA")}</Text>
          </VStack>
          <VStack w="160px" align="start">
            <Text>
              <span style={{ opacity: 0.5 }}>ID:</span>
              {transaction.id}
            </Text>
          </VStack>
          <Flex align="center" w="228px">
            <Flex
              w="32px"
              h="32px"
              border="1px"
              borderColor="outline"
              borderRadius="8px"
              align="center"
              justify="center"
              mr="8px"
            >
              <Icon as={CartAlt} />
            </Flex>

            <VStack align="start" spacing="0">
              <Text>{transaction.reference}</Text>
              <Text textStyle="body2" opacity="50%">
                {transaction.merchantDetails}
              </Text>
            </VStack>
          </Flex>

          <VStack align="end" w="132px">
            <Text
              color={
                parseFloat(transaction.amount) >= 0 ? "#3E9C42" : "#9A1111"
              }
              textStyle="label"
            >
              {`${parseFloat(transaction.amount) >= 0 ? "+" : "-"}${
                transaction.currency
              }${Math.abs(parseFloat(transaction.amount))}`}
            </Text>
            <Text textStyle="bady2">{transaction.status}</Text>
          </VStack>

          <IconButton
            aria-label="Details"
            icon={<Icon as={ArrowRight} />}
            variant="tertiary"
            onClick={onOpen}
          />

          {/* Modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody
                background="#F4F4F5"
                maxW="572px"
                borderRadius="20px"
                padding="32px"
              >
                <Text
                  marginTop="16px"
                  textStyle="title"
                  color={
                    parseFloat(transaction.amount) >= 0 ? "#3E9C42" : "#9A1111"
                  }
                >
                  {`${parseFloat(transaction.amount) >= 0 ? "+" : "-"}${
                    transaction.currency
                  }${Math.abs(parseFloat(transaction.amount))}`}
                </Text>
                <Text textStyle="label">{transaction.merchantDetails}</Text>

                <Text textStyle="body2" opacity="50%">
                  {dayjs(transaction.date).format("dddd, HH:mmA")}
                </Text>

                <Box
                  background="#fff"
                  borderRadius="20px"
                  padding="24px"
                  marginTop="16px"
                >
                  <VStack spacing="12px">
                    <Flex justify="space-between" align="center" w="full">
                      <Text opacity="50%">Transaction ID:</Text>
                      <Text fontWeight="bold">{transaction.id}</Text>
                    </Flex>

                    <Flex justify="space-between" align="center" w="full">
                      <Text opacity="50%">Reference:</Text>
                      <Text fontWeight="bold">{transaction.reference}</Text>
                    </Flex>

                    <Flex justify="space-between" align="center" w="full">
                      <Text opacity="50%">Category:</Text>
                      <HStack spacing="8px">
                        <Flex
                          w="32px"
                          h="32px"
                          border="1px"
                          borderColor="outline"
                          borderRadius="8px"
                          align="center"
                          justify="center"
                        >
                          <Icon as={CartAlt} />
                        </Flex>
                        <Text fontWeight="bold">
                          {transaction.category.name}
                        </Text>
                      </HStack>
                    </Flex>
                  </VStack>
                </Box>

                <Box
                  background="#fff"
                  borderRadius="20px"
                  padding="24px"
                  marginTop="16px"
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text opacity="50%">Status:</Text>
                    <Text fontWeight="bold">{transaction.status}</Text>
                  </Flex>

                  <Flex justify="space-between" align="center" mb={2}>
                    <Text opacity="50%">Card:</Text>
                    <Text fontWeight="bold">
                      {transaction.card?.cardNumber}
                    </Text>
                  </Flex>
                </Box>

                <Box
                  background="#fff"
                  borderRadius="20px"
                  padding="24px"
                  marginTop="16px"
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text opacity="50%">Download </Text>
                    <IconButton
                      aria-label="Details"
                      icon={<Icon as={Download} />}
                      variant="tertiary"
                    />
                  </Flex>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </Box>
    </>
  );
};

export default TransactionComponent;

interface TransactionsListProps {
  transactions: Transaction[];
}

export const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
  const sortedTransactions = [...transactions].sort((a, b) =>
    dayjs(b.date).diff(dayjs(a.date))
  );

  const mostRecentDate = sortedTransactions.length
    ? sortedTransactions[0].date
    : "";

  let lastDateProcessed = "";

  return (
    <VStack w="full" align="stretch" spacing={0}>
      {sortedTransactions.map((transaction, index) => {
        const isNewDay = lastDateProcessed !== transaction.date;
        if (isNewDay) {
          lastDateProcessed = transaction.date;
        }

        const isMostRecentDate = dayjs(transaction.date).isSame(
          mostRecentDate,
          "day"
        );
        const showDateAndBalance = isNewDay && isMostRecentDate;

        const showDate = isNewDay && !isMostRecentDate;

        const isLast = index === sortedTransactions.length - 1;

        return (
          <>
            {showDate && (
              <Box p={4}>
                <Text textStyle="label2" opacity="50%">
                  {dayjs(transaction.date).format("dddd, D/MM/YYYY")}
                </Text>
              </Box>
            )}
            <TransactionComponent
              key={transaction.id}
              transaction={transaction}
              isLast={isLast}
              showDateAndBalance={showDateAndBalance}
            />
          </>
        );
      })}
    </VStack>
  );
};
