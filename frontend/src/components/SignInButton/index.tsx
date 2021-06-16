import { Button, Icon, ButtonProps, Avatar } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/client';

const styles: ButtonProps = {
  type: 'button',
  h: '3rem',
  borderRadius: '1.5rem',
  px: '1.5rem',
  fontWeight: 'bold',
  maxW: '25rem',
  w: '100%',
  minW: '12.5rem',
  colorScheme: 'black',
  _hover: {
    filter: 'brightness(0.8)',
  },
};

export function SignInButton(): JSX.Element {
  const [session] = useSession();
  const name = session?.user?.name;
  const image = session?.user?.image;

  return session && name && image !== undefined ? (
    <Button
      {...styles}
      bg="palette.blue"
      data-testid="logout-google"
      onClick={() => signOut()}
    >
      {image ? (
        <Avatar name={name} src={image} size="sm" mr="0.75rem" />
      ) : (
        <Icon as={FaGoogle} h="1rem" w="1rem" mr="0.75rem" />
      )}
      {name}
      <Icon color="palette.light" as={FiX} ml="0.75rem" />
    </Button>
  ) : (
    <Button
      {...styles}
      bg="palette.red"
      onClick={() => signIn('google')}
      data-testid="login-google"
    >
      <Icon as={FaGoogle} h="1rem" w="1rem" mr="0.75rem" />
      Login com Google
    </Button>
  );
}
