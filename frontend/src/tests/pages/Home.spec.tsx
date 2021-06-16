import { render } from '@testing-library/react';

import Home from '../../pages';
import IndexContexts from '../../contexts';

jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false],
  };
});

describe('Home Page', () => {
  it('renders correctly', () => {
    render(<Home />);
  });
  it('renders correctly IndexContexts', () => {
    render(<IndexContexts />);
  });
});
