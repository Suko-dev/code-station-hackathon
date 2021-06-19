import Head from 'next/head';
import { useState } from 'react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Flex, Button, Stack, Text, Link } from '@chakra-ui/react';

import { Input } from '../components/Form/Input';
import { Logo } from '../components/Logo';
import { useAuth } from '../contexts/AuthContext';

type SignInFormData = { email: string; password: string };

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn(): JSX.Element {
  const { signInUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    const { email, password } = values;

    if (isLogin) {
      await signInUp({ email, password });
    }

    if (!isLogin) {
      await signInUp({ email, password, signUp: true });
    }
  };

  return (
    <>
      <Head>
        <title>Code Station</title>
      </Head>
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          w="100%"
          maxWidth="22.5rem"
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Logo />
          <Text as="h2" color="pink.300" fontWeight="bold" mb="1rem">
            {isLogin ? 'Login' : 'Crie sua conta'}
          </Text>
          <Stack spacing="4">
            <Input
              {...register('email')}
              name="email"
              label="E-mail"
              type="email"
              error={errors.email}
            />
            <Input
              {...register('password')}
              name="password"
              label="Senha"
              type="password"
              error={errors.password}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </Button>
          <Link
            color="pink.500"
            href="#"
            mt="1rem"
            onClick={() => setIsLogin(!isLogin)}
            w="100px"
          >
            {isLogin ? 'Crie sua conta' : 'Faça seu Login'}
          </Link>
        </Flex>
      </Flex>
    </>
  );
}
