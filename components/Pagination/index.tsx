import React, { memo } from "react";
import { Button, Icon, HStack, type StackProps } from "@chakra-ui/react";
import { NavArrowLeft, NavArrowRight } from "iconoir-react";

interface PaginationProps extends StackProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = memo(
  ({ currentPage, totalPages, onPageChange, ...props }) => {
    const handlePageChange = (page: number) => () => {
      if (page < 1 || page > totalPages || page === currentPage) return;
      onPageChange(page);
    };
    return (
      <HStack align="center" justify="center" {...props}>
        {currentPage !== 1 && (
          <Button
            size="xs"
            onClick={handlePageChange(currentPage - 1)}
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
            const isPrevOrNext =
              page === currentPage - 1 || page === currentPage + 1;
            const isStartOrEnd = page === 1 || page === totalPages;
            const isEllipsis =
              page === currentPage - 2 || page === currentPage + 2;

            if (page === currentPage) {
              return (
                <Button key={page} size="xs" variant="primary">
                  {page}
                </Button>
              );
            }
            if (isPrevOrNext || isStartOrEnd) {
              return (
                <Button
                  key={page}
                  size="xs"
                  variant="tertiary"
                  onClick={handlePageChange(page)}
                >
                  {page}
                </Button>
              );
            }
            if (isEllipsis) {
              return (
                <Button
                  key={page}
                  size="xs"
                  variant="tertiary"
                  onClick={handlePageChange(page)}
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
            size="xs"
            onClick={handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="tertiary"
          >
            Next
            <Icon as={NavArrowRight} />
          </Button>
        )}
      </HStack>
    );
  }
);

PaginationComponent.displayName = "PaginationComponent";

export default PaginationComponent;
