import { render } from '@testing-library/react';

import Home from '../../pages';
import IndexContexts from '../../contexts';

describe('Home Page', () => {
  it('renders correctly', () => {
    render(<Home />);
  });
  it('renders correctly IndexContexts', () => {
    render(<IndexContexts />);
  });
});
