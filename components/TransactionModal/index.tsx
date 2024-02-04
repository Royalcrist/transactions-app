import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  type ModalProps,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import DetailGrid, { DetailGridProps } from "../DetailGrid";
import type { UITransaction } from "@/interfaces";

export interface TransactionModalProps extends Omit<ModalProps, "children"> {
  isOpen: boolean;
  onClose: () => void;
  transaction: UITransaction;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
  ...props
}) => {
  const detailGroups: DetailGridProps[] = [
    {
      details: [
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
          value: transaction.category.name,
          valueIcon: transaction.category.iconName,
        },
      ],
    },
    {
      details: [
        {
          label: "Status",
          value: transaction.status,
        },
        {
          label: "Card",
          value: transaction.card?.cardNumber.replace(
            /(?<=.{2}).(?=.{4})/g,
            "*"
          ),
          valueIcon: "MastercardCard",
        },
        {
          label: "Balance",
          value: transaction.balance.toFormat(),
        },
      ].reduce((acc, detail) => {
        if (detail.value) {
          acc.push(detail);
        }
        return acc;
      }, [] as DetailGridProps["details"]),
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" {...props}>
      <ModalOverlay bg="overlay" />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody background="background" borderRadius="lg" p={8}>
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

            {detailGroups.map((group, index) => (
              <DetailGrid key={index} details={group.details} />
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
