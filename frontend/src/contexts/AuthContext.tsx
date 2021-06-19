import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

import { api } from '../services/apiClient';

type User = {
  email: string;
};

type SignCredentials = {
  email: string;
  password: string;
  signUp?: boolean;
};

type AuthContextData = {
  signInUp: (credentials: SignCredentials) => Promise<void>;
  signOut: () => void;
  user: User | undefined;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut(): void {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    //  Não é possível desestruturar algo que tem o caractere . por isso colocamos entre aspas e atribuímos a uma variável.
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      api
        .get('/me')
        .then((response) => {
          const { email } = response.data;

          setUser({
            email,
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signInUp({
    email,
    password,
    signUp = false,
  }: SignCredentials): Promise<void> {
    const endpoint = signUp ? '/users' : '/users/login';

    try {
      const response = await api.post(endpoint, {
        email,
        password,
      });

      const { token, refreshToken } = response.data;

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      setUser({
        email,
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signInUp,
        signOut,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const auth = useContext(AuthContext);
  return auth;
}
