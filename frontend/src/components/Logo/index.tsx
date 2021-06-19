import { Text, Flex } from '@chakra-ui/react';

export function Logo(): JSX.Element {
  return (
    <Flex w="100%" alignItems="center" justifyContent="center">
      <Text fontSize={['5xl', '3xl']} fontWeight="bold" letterSpacing="tight">
        cardpreço
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>
    </Flex>
  );
}
