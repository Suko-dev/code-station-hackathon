import { fireEvent, render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/client';

import { SignInButton } from '.';

jest.mock('next-auth/client');

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', async () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    const buttonLogin = await screen.findByTestId('login-google');
    fireEvent.click(buttonLogin);

    expect(screen.getByText('Login com Google')).toBeInTheDocument();
  });

  it('renders correctly when user is authenticated', async () => {
    const useSessionMocked = mocked(useSession);
    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      image: null,
    };

    useSessionMocked.mockReturnValue([
      {
        user,
        expires: 'fake-expires',
      },
      true,
    ]);

    render(<SignInButton />);

    const buttonLogout = await screen.findByTestId('logout-google');
    fireEvent.click(buttonLogout);

    expect(screen.getByText('John Doe')).toBeInTheDocument();

    user.image = 'https://bit.ly/sage-adebayo';

    render(<SignInButton />);
  });
});
