import React from "react";
import { Button, Box, Text, Icon, HStack } from "@chakra-ui/react";

import { NavArrowLeft, NavArrowRight } from "iconoir-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPaginationGroup = () => {
    let start = Math.max(currentPage - 1, 1);
    let end = Math.min(start + 2, totalPages);

    if (totalPages - currentPage < 1) {
      start = Math.max(totalPages - 2, 1);
      end = totalPages;
    }

    const range = [];
    for (let i = start; i <= end; i++) {
      if (i > 0 && i <= totalPages) {
        range.push(i);
      }
    }

    return range;
  };

  return (
    <HStack>
      <Button
        size={"sm"}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="tertiary"
      >
        <Icon as={NavArrowLeft} />
        Prev
      </Button>

      {currentPage > 1 && (
        <>
          <Button onClick={() => onPageChange(1)}>1</Button>
          {currentPage > 2 && <Text>...</Text>}
        </>
      )}

      {getPaginationGroup().map((page) => (
        <Button
          size={"sm"}
          key={page}
          onClick={() => onPageChange(page)}
          variant="tertiary"
        >
          {page}
        </Button>
      ))}

      {currentPage < totalPages - 1 && (
        <>
          {currentPage < totalPages - 2 && <Text>...</Text>}
          <Button
            size={"sm"}
            onClick={() => onPageChange(totalPages)}
            variant="tertiary"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        size={"sm"}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="tertiary"
      >
        Next
        <Icon as={NavArrowRight} />
      </Button>
    </HStack>
  );
};

export default PaginationComponent;
