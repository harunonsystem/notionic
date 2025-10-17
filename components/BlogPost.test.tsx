import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setupMockRouter } from '@/testUtils/mocks/nextRouter'
import BlogPost from './BlogPost'

// Mock dependencies - we'll use a simpler approach
vi.mock('@/blog.config', () => ({
  BLOG: {
    path: '',
    title: 'Test Blog'
  }
}))

vi.mock('@/components/Common/FormattedDate', () => ({
  default: ({ date }: { date: string }) => (
    <div data-testid='formatted-date'>{date}</div>
  )
}))

vi.mock('next/image', () => ({
  default: function MockImage({
    alt,
    src,
    className
  }: {
    alt: string
    src: string
    className: string
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img data-testid='next-image' alt={alt} src={src} className={className} />
    )
  }
}))

describe('BlogPost', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setupMockRouter({ locale: 'en', pathname: '/' })
  })

  const mockPost = {
    id: 'test-id',
    title: 'Test Blog Post',
    slug: 'test-blog-post',
    date: '2024-01-01',
    summary: 'This is a test blog post summary.',
    page_cover: '/test-image.jpg'
  }

  it('renders blog post with correct structure', () => {
    render(<BlogPost post={mockPost} />)

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(
      screen.getByText('This is a test blog post summary.')
    ).toBeInTheDocument()
    expect(screen.getByTestId('formatted-date')).toHaveTextContent('2024-01-01')
  })

  it('renders with correct link path', () => {
    render(<BlogPost post={mockPost} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test-blog-post')
  })

  it('displays cover image correctly', () => {
    render(<BlogPost post={mockPost} />)

    const image = screen.getByTestId('next-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Test Blog Post')
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<BlogPost post={mockPost} />)

    const article = container.querySelector('article')
    expect(article).toHaveClass(
      'group',
      'flex',
      'flex-col',
      'overflow-hidden',
      'relative',
      'mb-5',
      'md:mb-8',
      'cursor-pointer',
      'rounded-xl',
      'p-5'
    )
  })

  it('formats title correctly with responsive classes', () => {
    render(<BlogPost post={mockPost} />)

    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toHaveClass('text-lg', 'md:text-xl', 'font-medium')
  })

  it('shows summary only on md screens and larger', () => {
    const { container } = render(<BlogPost post={mockPost} />)

    const summary = container.querySelector('p')
    expect(summary).toHaveClass('hidden', 'md:block')
  })

  it('renders with correct structure for default path', () => {
    render(<BlogPost post={mockPost} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test-blog-post')
  })

  it('renders with custom styling for responsive cover images', () => {
    render(<BlogPost post={mockPost} />)

    const image = screen.getByTestId('next-image')
    expect(image).toHaveClass(
      'w-full',
      'h-full',
      'object-cover',
      'object-center',
      'absolute',
      'inset-0',
      'group-hover:scale-110',
      'transition',
      'duration-200'
    )
  })

  it('has proper accessibility attributes', () => {
    render(<BlogPost post={mockPost} />)

    const link = screen.getByRole('link')
    const image = screen.getByTestId('next-image')

    expect(link).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Test Blog Post')
  })

  it('maintains proper header structure', () => {
    const { container } = render(<BlogPost post={mockPost} />)

    const header = container.querySelector('header')
    expect(header).toHaveClass(
      'flex',
      'flex-col',
      'justify-between',
      'md:flex-row',
      'md:items-baseline'
    )
  })

  it('displays date element', () => {
    render(<BlogPost post={mockPost} />)

    const dateElement = screen.getByTestId('formatted-date')
    expect(dateElement).toBeInTheDocument()
    expect(dateElement).toHaveTextContent('2024-01-01')
  })
})
