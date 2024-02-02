import React from "react";
import { Button, Icon, HStack } from "@chakra-ui/react";

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
  return (
    <HStack>
      {currentPage !== 1 && (
        <Button
          size={"sm"}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="tertiary"
        >
          <Icon as={NavArrowLeft} />
          Prev
        </Button>
      )}

      {
        // start from the current page - 1, and end at the current page + 1. add ... text between the page + 1 and the last page
        Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          if (page === currentPage) {
            return (
              <Button
                key={page}
                size={"sm"}
                variant="primary"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            );
          }
          if (
            page === currentPage - 1 ||
            page === currentPage + 1 ||
            page === 1 ||
            page === totalPages
          ) {
            return (
              <Button
                key={page}
                size={"sm"}
                variant="tertiary"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            );
          }
          if (page === currentPage - 2 || page === currentPage + 2) {
            // return <Text key={page}>...</Text>;
            return (
              <Button
                key={page}
                size={"sm"}
                variant="tertiary"
                onClick={() => onPageChange(page)}
              >
                ...
              </Button>
            );
          }
          return null;
        })
      }

      {currentPage !== totalPages && (
        <Button
          size={"sm"}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="tertiary"
        >
          Next
          <Icon as={NavArrowRight} />
        </Button>
      )}
    </HStack>
  );
};

export default PaginationComponent;
