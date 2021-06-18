import Head from 'next/head';

import { Flex } from '@chakra-ui/react';

import { SignInButton } from '../components/SignInButton';
import { Logo } from '../components/Logo';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Code Station</title>
      </Head>
      <Flex
        w="100%"
        h="100vh"
        flexDir="column"
        p="1rem"
        maxW="80rem"
        marginX="auto"
      >
        <Flex w="100%" h={['100%', 'auto']} flexDir={['column', 'row']}>
          <Logo />
          <Flex mt={['auto', '0']}>
            <SignInButton />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
