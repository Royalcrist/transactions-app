// ModalDetail.tsx
import React from "react";
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowRight, CartAlt, Download } from "iconoir-react";
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody background="#F4F4F5" borderRadius={5} padding={8}>
          <Text
            marginTop={4}
            textStyle="title"
            color={transaction.amount.getAmount() >= 0 ? "#3E9C42" : "#9A1111"}
          >
            {transaction.amount.toFormat()}
          </Text>
          <Text textStyle="label">{transaction.merchantName}</Text>

          <Text textStyle="body2" opacity="50%">
            {dayjs.utc(transaction.createdAt).local().format("dddd, HH:mmA")}
          </Text>

          <Box background="#fff" borderRadius="md" padding={6} marginTop={4}>
            <VStack spacing={3}>
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
                <HStack spacing={2}>
                  <Flex
                    boxSize={8}
                    borderWidth="1px"
                    borderColor="outline"
                    borderRadius="md"
                    align="center"
                    justify="center"
                  >
                    <IconoirIconProvider icon={transaction.category.iconName} />
                  </Flex>
                  <Text fontWeight="bold">{transaction.category.name}</Text>
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
              <Text fontWeight="bold">{transaction.card?.cardNumber}</Text>
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
  );
};

export default ModalDetail;
