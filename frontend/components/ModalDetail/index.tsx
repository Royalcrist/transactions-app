import React from "react";
import {
  Flex,
  Grid,
  GridItem,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Download } from "iconoir-react";
import dayjs from "dayjs";
import { UITransaction } from "../TransactionComponent";
import IconoirIconProvider from "../IconoirIconProvider";

interface ModalDetailProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: UITransaction;
}

const ModalDetail: React.FC<ModalDetailProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody background="#F4F4F5" borderRadius="md" p={8}>
          <Flex direction="column" gap={4}>
            <Flex direction="column" gap={3}>
              <Text
                textStyle="title"
                color={
                  transaction.amount.getAmount() >= 0 ? "#3E9C42" : "#9A1111"
                }
              >
                {transaction.amount.toFormat()}
              </Text>
              <Text textStyle="label">{transaction.merchantName}</Text>
              <Text textStyle="body2" opacity="50%">
                {dayjs
                  .utc(transaction.createdAt)
                  .local()
                  .format("dddd, HH:mmA")}
              </Text>
            </Flex>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem colSpan={2} bg="white" borderRadius="md" p={6}>
                <Flex direction="column" gap={3}>
                  <Flex justifyContent="space-between" gap={3}>
                    <Text opacity="50%">Transaction ID:</Text>
                    <Text>{transaction.id}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text opacity="50%">Reference:</Text>
                    <Text noOfLines={1}>{transaction.reference}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text opacity="50%">Category:</Text>
                    <Flex alignItems="center">
                      <Flex
                        boxSize={8}
                        borderWidth="1px"
                        borderColor="outline"
                        borderRadius="md"
                        align="center"
                        justify="center"
                      >
                        <IconoirIconProvider
                          icon={transaction.category.iconName}
                        />
                      </Flex>
                      <Text ml={2}>{transaction.category.name}</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </GridItem>

              <GridItem colSpan={2} bg="white" borderRadius="md" p={6}>
                <Flex direction="column" gap={3}>
                  <Flex justifyContent="space-between">
                    <Text opacity="50%">Status:</Text>
                    <Text>{transaction.status}</Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text opacity="50%">Card:</Text>
                    <Text fontWeight="bold">
                      {transaction.card?.cardNumber}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between">
                    <Text opacity="50%">Balance:</Text>
                    <Text>{transaction.balance}</Text>
                  </Flex>
                </Flex>
              </GridItem>

              <GridItem colSpan={2} bg="white" borderRadius="md" p={6}>
                <Flex direction="column" gap={3}>
                  <Flex justifyContent="space-between">
                    <Text opacity="50%">Download</Text>
                    <IconButton
                      aria-label="Download"
                      icon={<Download />}
                      variant="tertiary"
                    />
                  </Flex>
                </Flex>
              </GridItem>
            </Grid>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalDetail;
