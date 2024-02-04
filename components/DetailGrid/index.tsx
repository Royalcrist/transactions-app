import {
  Box,
  type BoxProps,
  Flex,
  Grid,
  GridItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import IconoirIconProvider from "../IconoirIconProvider";

export interface DetailGridProps extends Omit<BoxProps, "children"> {
  details: {
    label: string;
    value?: any;
    valueIcon?: string;
  }[];
}

const DetailGrid = ({ details, ...props }: DetailGridProps) => {
  return (
    <Box bg="surface" borderRadius="md" p={6} {...props}>
      <VStack gap={3}>
        {details.map((detail, index) => (
          <Grid
            key={index}
            templateAreas='"key value"'
            templateColumns="1 2fr"
            gap={8}
            width="full"
          >
            <GridItem gridArea="key">
              <Text opacity="50%">{detail.label}:</Text>
            </GridItem>
            <GridItem justifySelf="end" textAlign="end" gridArea="value">
              <Flex alignItems="center" gap={2}>
                {detail?.valueIcon && (
                  <IconoirIconProvider icon={detail.valueIcon} />
                )}
                <Text>{detail.value}</Text>
              </Flex>
            </GridItem>
          </Grid>
        ))}
      </VStack>
    </Box>
  );
};

export default DetailGrid;
