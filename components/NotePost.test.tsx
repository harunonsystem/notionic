import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import NotePost from './NotePost'

// Mock dependencies
vi.mock('@/blog.config.js', () => ({
  BLOG: {
    defaultCover: '/default-cover.jpg'
  }
}))

vi.mock('./Common/ImageFallback.js', () => ({
  default: ({ src, alt, className }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-testid='image-fallback'
      src={src}
      alt={alt}
      className={className}
    />
  )
}))

describe('NotePost', () => {
  const mockNote = {
    title: 'Test Note',
    slug: 'test-note',
    url: 'https://api.craft.do/embed/12345678901234567890'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders note post with correct structure', () => {
    render(<NotePost note={mockNote} />)

    expect(screen.getByText('Test Note')).toBeInTheDocument()
  })

  it('generates craftSlug correctly from URL', () => {
    render(<NotePost note={mockNote} />)

    const link = screen.getByRole('link')
    const _craftSlug = mockNote.url.slice(23) // Should be 'embed/12345678901234567890'

    expect(link).toHaveAttribute('href', '/notes.tsx/test-note')
    expect(link).toHaveClass('mb-10', 'group', 'h-60', 'flex', 'items-end')
  })

  it('renders ImageFallback with correct props', () => {
    render(<NotePost note={mockNote} />)

    const image = screen.getByTestId('image-fallback')
    const _craftSlug = mockNote.url.slice(23)

    expect(image).toHaveAttribute(
      'src',
      `https://api.craft.do/render/preview/${_craftSlug}`
    )
    expect(image).toHaveAttribute('alt', 'Test Note')
  })

  it('handles BLOG.defaultCover fallback correctly', () => {
    render(<NotePost note={mockNote} />)

    const image = screen.getByTestId('image-fallback')
    expect(image.parentElement).toBeInTheDocument()
  })

  it('applies correct CSS classes to link', () => {
    render(<NotePost note={mockNote} />)

    const link = screen.getByRole('link')
    expect(link).toHaveClass(
      'mb-10',
      'group',
      'h-60',
      'flex',
      'items-end',
      'bg-gray-100',
      'rounded-lg',
      'overflow-hidden',
      'relative',
      'p-4'
    )
  })

  it('applies correct CSS classes to image', () => {
    render(<NotePost note={mockNote} />)

    const image = screen.getByTestId('image-fallback')
    const _craftSlug = mockNote.url.slice(23)

    expect(image).toHaveClass(
      'w-full',
      'h-full',
      'object-cover',
      'object-center',
      'absolute',
      'inset-0',
      'group-hover:scale-105',
      'transition',
      'duration-200'
    )
  })

  it('displays mobile-only gradient overlay', () => {
    const { container } = render(<NotePost note={mockNote} />)

    const gradient = container.querySelector('.bg-gradient-to-t')
    expect(gradient).toHaveClass(
      'md:hidden',
      'bg-gradient-to-t',
      'from-gray-900',
      'via-transparent',
      'to-transparent',
      'opacity-80',
      'absolute',
      'inset-0',
      'pointer-events-none'
    )
  })

  it('displays mobile-only title with correct classes', () => {
    render(<NotePost note={mockNote} />)

    const title = screen.getByText('Test Note')
    expect(title).toHaveClass(
      'text-white',
      'text-lg',
      'lg:text-xl',
      'font-semibold'
    )
  })

  it('renders mobile-only title container', () => {
    const { container } = render(<NotePost note={mockNote} />)

    const mobileContainer = container.querySelector('.flex.flex-col.relative')
    expect(mobileContainer).toHaveClass(
      'md:hidden',
      'flex',
      'flex-col',
      'relative'
    )
  })

  it('has correct accessibility with link role', () => {
    render(<NotePost note={mockNote} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/notes.tsx/test-note')
  })

  it('handles different URL formats correctly', () => {
    const noteWithDifferentUrl = {
      title: 'Different Note',
      slug: 'different-note',
      url: 'https://api.craft.do/embed/x987y654'
    }

    render(<NotePost note={noteWithDifferentUrl} />)

    const image = screen.getByTestId('image-fallback')
    // Verify the src includes the expected preview format
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('render/preview')
    )
    expect(image).toHaveAttribute('src', expect.stringContaining('x987y654'))
  })

  it('handles edge cases with minimal data', () => {
    const minimalNote = {
      title: '',
      slug: '',
      url: 'https://api.craft.do/embed/minimal'
    }

    render(<NotePost note={minimalNote} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/notes.tsx')
  })
})
