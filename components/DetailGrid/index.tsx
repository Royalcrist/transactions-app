import React from "react";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

interface DetailGridProps {
  details: {
    label: string;
    value?: any;
    icon?: JSX.Element;
  }[];
}

const DetailGrid = ({ details }: DetailGridProps) => {
  return (
    <GridItem colSpan={2} bg="white" borderRadius="md" p={6}>
      <Grid gap={3}>
        {details.map((detail, index) => (
          <Box key={index}>
            <Grid templateColumns="repeat(2, 1fr)">
              <GridItem colSpan={1}>
                <Text opacity="50%">{detail.label}:</Text>
              </GridItem>
              <GridItem colSpan={1} justifySelf="end">
                <Flex alignItems="center">
                  {detail.icon}
                  <Text maxW="50ch" ml={detail.icon ? 2 : 0}>
                    {detail.value}
                  </Text>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        ))}
      </Grid>
    </GridItem>
  );
};

export default DetailGrid;
