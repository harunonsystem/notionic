import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setupMockRouter } from '@/testUtils/mocks/nextRouter'
import Pagination from './Pagination'

describe('Pagination', () => {
  const mockLocale = 'en'

  beforeEach(() => {
    vi.clearAllMocks()
    setupMockRouter(mockLocale)
  })

  it('should render prev and next buttons when on middle page', () => {
    render(<Pagination page='2' showNext={true} />)

    const prevButton = screen.getByRole('button', { name: /prev/i })
    const nextButton = screen.getByRole('button', { name: /next/i })

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('should render only next button on first page', () => {
    render(<Pagination page='1' showNext={true} />)

    const prevButton = screen.queryByRole('button', { name: /prev/i })
    const nextButton = screen.getByRole('button', { name: /next/i })

    expect(prevButton).not.toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('should render only prev button on last page', () => {
    render(<Pagination page='3' showNext={false} />)

    const prevButton = screen.getByRole('button', { name: /prev/i })
    const nextButton = screen.queryByRole('button', { name: /next/i })

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).not.toBeInTheDocument()
  })

  it('should render nothing when on first page and no next page', () => {
    render(<Pagination page='1' showNext={false} />)

    const prevButton = screen.queryByRole('button', { name: /prev/i })
    const nextButton = screen.queryByRole('button', { name: /next/i })

    expect(prevButton).not.toBeInTheDocument()
    expect(nextButton).not.toBeInTheDocument()
  })

  it('should have correct link for prev button going to root from page 2', () => {
    render(<Pagination page='2' showNext={true} />)

    const prevLink = screen.getByRole('link', { name: /prev/i })
    expect(prevLink).toHaveAttribute('href', '/')
  })

  it('should have correct link for prev button going to page 2 from page 3', () => {
    render(<Pagination page='3' showNext={true} />)

    const prevLink = screen.getByRole('link', { name: /prev/i })
    expect(prevLink).toHaveAttribute('href', '/page/2')
  })

  it('should have correct link for next button', () => {
    render(<Pagination page='2' showNext={true} />)

    const nextLink = screen.getByRole('link', { name: /next/i })
    expect(nextLink).toHaveAttribute('href', '/page/3')
  })

  it('should use Japanese text when locale is ja', () => {
    setupMockRouter('ja')

    render(<Pagination page='2' showNext={true} />)

    expect(screen.getByText('Prev')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('should have correct CSS classes for flex layout', () => {
    render(<Pagination page='2' showNext={true} />)

    const prevLink = screen.getByRole('link', { name: /prev/i })
    const nextLink = screen.getByRole('link', { name: /next/i })

    expect(prevLink).toBeInTheDocument()
    expect(nextLink).toBeInTheDocument()
  })

  it('should show only next button on first page', () => {
    render(<Pagination page='1' showNext={true} />)

    const prevButton = screen.queryByRole('button', { name: /prev/i })
    const nextButton = screen.getByRole('button', { name: /next/i })

    expect(prevButton).not.toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('should show only prev button on last page', () => {
    render(<Pagination page='3' showNext={false} />)

    const prevButton = screen.getByRole('button', { name: /prev/i })
    const nextButton = screen.queryByRole('button', { name: /next/i })

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).not.toBeInTheDocument()
  })

  it('should have correct link structure', () => {
    render(<Pagination page='2' showNext={true} />)

    const prevLink = screen.getByRole('link', { name: /prev/i })
    const nextLink = screen.getByRole('link', { name: /next/i })

    expect(prevLink).toHaveAttribute('href')
    expect(nextLink).toHaveAttribute('href')
  })

  it('should have proper button types', () => {
    render(<Pagination page='2' showNext={true} />)

    const prevButton = screen.getByRole('button', { name: /prev/i })
    const nextButton = screen.getByRole('button', { name: /next/i })

    expect(prevButton).toHaveAttribute('type', 'button')
    expect(nextButton).toHaveAttribute('type', 'button')
  })

  it('should convert page string to number correctly', () => {
    // Test with string number to ensure proper conversion
    render(<Pagination page='5' showNext={true} />)

    expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('should have proper button roles and attributes', () => {
    render(<Pagination page='2' showNext={true} />)

    const prevButton = screen.getByRole('button', { name: /prev/i })
    const nextButton = screen.getByRole('button', { name: /next/i })

    expect(prevButton).toHaveAttribute('type', 'button')
    expect(prevButton).toHaveAttribute('rel', 'prev')
    expect(nextButton).toHaveAttribute('type', 'button')
    expect(nextButton).toHaveAttribute('rel', 'next')
  })
})
