import { Text, Flex } from '@chakra-ui/react';

export function Logo(): JSX.Element {
  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent={['center', 'flex-start']}
    >
      <Text fontSize={['5xl', '3xl']} fontWeight="bold" letterSpacing="tight">
        cardpreço
        <Text as="span" ml="1" color="palette.red">
          .
        </Text>
      </Text>
    </Flex>
  );
}
