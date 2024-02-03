import React from "react";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Download, MastercardCard } from "iconoir-react";
import dayjs from "dayjs";
import { UITransaction } from "../TransactionComponent";
import IconoirIconProvider from "../IconoirIconProvider";
import DetailGrid from "../DetailGrid";

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
      <ModalOverlay bg="rgba(0, 0, 0, 0.7)" />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody background="#F4F4F5" borderRadius="lg" p={8}>
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

            <DetailGrid
              details={[
                {
                  label: "Transaction ID",
                  value: transaction.id,
                },
                {
                  label: "Reference",
                  value: transaction.reference,
                },
                {
                  label: "Category",
                  icon: (
                    <IconoirIconProvider icon={transaction.category.iconName} />
                  ),
                  value: transaction.category.name,
                },
              ]}
            />

            <DetailGrid
              details={[
                {
                  label: "Status",
                  value: transaction.status,
                },
                {
                  label: "Card",
                  icon: <MastercardCard />,
                  value: transaction.card?.cardNumber
                    ? transaction.card.cardNumber.slice(0, 2) +
                      "••••••••" +
                      transaction.card.cardNumber.slice(-4)
                    : "",
                },
                {
                  label: "Balance",
                  value: transaction.balance.toFormat(),
                },
              ]}
            />

            <DetailGrid
              details={[
                {
                  label: "Download",
                  icon: <Download />,
                },
              ]}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalDetail;
