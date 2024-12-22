// Custom404.test.jsx
import { render, screen } from '@testing-library/react';
import Custom404 from './404';
import NotFound from '@/components/NotFound';
import { vi, describe, expect, it } from 'vitest';

// Mock the NotFound component
vi.mock('@/components/NotFound', () => {
  return {
    default: ({ statusCode }) => (
      <div data-testid="not-found">Not Found: {statusCode}</div>
    ),
  };
});

describe('Custom404 Component', () => {
  it('renders NotFound component with statusCode 404', () => {
    render(<Custom404 />);

    // Check if the mocked NotFound component is rendered with correct props
    const notFoundElement = screen.getByTestId('not-found');
    expect(notFoundElement).toBeInTheDocument();
    expect(notFoundElement).toHaveTextContent('Not Found: 404');
  });
});
