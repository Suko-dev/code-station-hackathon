import { Button, Icon, ButtonProps, Avatar } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/client';

const styles: ButtonProps = {
  type: 'button',
  h: '3.75rem',
  borderRadius: '1rem',
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
        <Icon as={FcGoogle} mr="0.75rem" />
      )}
      {name}
      <Icon color="palette.light" as={FiX} ml="0.75rem" />
    </Button>
  ) : (
    <Button
      {...styles}
      bg="palette.blue"
      onClick={() => signIn('google')}
      data-testid="login-google"
    >
      <Icon as={FcGoogle} h="1rem" w="1rem" mr="0.75rem" />
      Login com Google
    </Button>
  );
}
