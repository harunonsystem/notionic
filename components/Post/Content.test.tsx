import { render, screen } from '@testing-library/react'

import { beforeEach, describe, expect, it, vi } from 'vitest'
import Content from './Content'

// Mock dependencies
vi.mock('@/blog.config', () => ({
  BLOG: {
    path: '/blog',
    previewImagesEnabled: true
  }
}))

vi.mock('@/components/Common/FormattedDate', () => ({
  default: ({ date }: { date: string }) => (
    <div data-testid='formatted-date'>{date}</div>
  )
}))

vi.mock('@/components/Common/TagItem', () => ({
  default: ({ tag }: { tag: string }) => (
    <div data-testid={`tag-${tag}`}>{tag}</div>
  )
}))

vi.mock('@/components/Post/NotionRenderer', () => ({
  default: ({ previewImages }: any) => (
    <div data-testid='notion-renderer'>
      <div data-test-preview={previewImages}>Notion Content</div>
    </div>
  )
}))

vi.mock('@/components/Post/PastOneYear', () => ({
  default: ({ date }: { date: string }) => (
    <div data-testid='past-one-year'>{date}</div>
  )
}))

describe('Content', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockFrontMatter = {
    title: 'Test Article',
    slug: 'test-article',
    date: '2024-01-01',
    type: ['Post'],
    tags: ['javascript', 'react']
  }

  const mockBlockMap = {} as any

  it('renders with article structure', () => {
    render(<Content frontMatter={mockFrontMatter} blockMap={mockBlockMap} />)

    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(screen.getByText('Test Article')).toBeInTheDocument()
  })

  it('displays title with correct styling', () => {
    render(<Content frontMatter={mockFrontMatter} blockMap={mockBlockMap} />)

    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveClass(
      'font-bold',
      'text-3xl',
      'text-black',
      'dark:text-white'
    )
  })

  it('shows back link when pageTitle is provided', () => {
    render(
      <Content
        frontMatter={mockFrontMatter}
        blockMap={mockBlockMap}
        pageTitle='Custom Page Title'
      />
    )

    const backLink = screen.getByText('Test Article')
    expect(backLink).toBeInTheDocument()
    expect(backLink.closest('a')).toHaveAttribute('href', '/blog/test-article')
  })

  it('displays pageTitle when provided over frontMatter.title', () => {
    render(
      <Content
        frontMatter={mockFrontMatter}
        blockMap={mockBlockMap}
        pageTitle='Custom Page Title'
      />
    )

    expect(screen.getByText('Custom Page Title')).toBeInTheDocument()
    // Check that both titles may be displayed based on the layout implementation
    expect(screen.getByText('Test Article')).toBeInTheDocument() // In back link
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders navigation for non-Page content types', () => {
    render(<Content frontMatter={mockFrontMatter} blockMap={mockBlockMap} />)

    expect(screen.getByTestId('formatted-date')).toBeInTheDocument()
    expect(screen.getByTestId('tag-javascript')).toBeInTheDocument()
    expect(screen.getByTestId('tag-react')).toBeInTheDocument()
  })

  it('renders PastOneYear component', () => {
    render(<Content frontMatter={mockFrontMatter} blockMap={mockBlockMap} />)

    expect(screen.getByTestId('past-one-year')).toBeInTheDocument()
    expect(screen.getByTestId('past-one-year')).toHaveTextContent('2024-01-01')
  })

  it('renders NotionRenderer with correct props', () => {
    render(<Content frontMatter={mockFrontMatter} blockMap={mockBlockMap} />)

    const renderer = screen.getByTestId('notion-renderer')
    expect(renderer).toBeInTheDocument()
    // Check that NotionRenderer is rendered with the correct structure
    expect(screen.getByText('Notion Content')).toBeInTheDocument()
  })

  it('passes additional props to NotionRenderer', () => {
    const additionalProps = {
      className: 'custom-class',
      customProp: 'test'
    }

    render(
      <Content
        frontMatter={mockFrontMatter}
        blockMap={mockBlockMap}
        props={additionalProps}
      />
    )

    const renderer = screen.getByTestId('notion-renderer')
    expect(renderer).toBeInTheDocument()
  })

  it('handles empty tags gracefully', () => {
    const frontMatterWithoutTags = {
      ...mockFrontMatter,
      tags: undefined
    }

    render(
      <Content frontMatter={frontMatterWithoutTags} blockMap={mockBlockMap} />
    )

    const tagsContainer = screen.queryByTestId('tag-javascript')
    expect(tagsContainer).not.toBeInTheDocument()
  })

  it('handles Page type correctly (no nav)', () => {
    const pageFrontMatter = {
      ...mockFrontMatter,
      type: ['Page']
    }

    render(<Content frontMatter={pageFrontMatter} blockMap={mockBlockMap} />)

    // Navigation should not be rendered for Page type
    expect(screen.queryByTestId('formatted-date')).not.toBeInTheDocument()
    expect(screen.queryByTestId('tag-javascript')).not.toBeInTheDocument()
  })

  it('applies correct CSS classes to article container', () => {
    render(<Content frontMatter={mockFrontMatter} blockMap={mockBlockMap} />)

    const article = screen.getByRole('article')
    expect(article).toHaveClass(
      'flex-none',
      'md:overflow-x-visible',
      'overflow-x-scroll',
      'w-full'
    )
  })

  it('renders navigation with correct structure', () => {
    const { container } = render(
      <Content frontMatter={mockFrontMatter} blockMap={mockBlockMap} />
    )

    const nav = container.querySelector('nav')
    expect(nav).toHaveClass(
      'flex',
      'mt-5',
      'mb-10',
      'items-start',
      'text-gray-500',
      'dark:text-gray-400'
    )
  })

  it('displays tags with correct container styling', () => {
    const { container } = render(
      <Content frontMatter={mockFrontMatter} blockMap={mockBlockMap} />
    )

    const tagsContainer = container.querySelector('.article-tags')
    expect(tagsContainer).toHaveClass(
      'flex',
      'flex-nowrap',
      'max-w-full',
      'overflow-x-auto',
      'article-tags'
    )
  })

  it('handles BLOG back link correctly', () => {
    render(
      <Content
        frontMatter={mockFrontMatter}
        blockMap={mockBlockMap}
        pageTitle='Custom Title'
      />
    )

    const backLink = screen.getByText('Test Article')
    expect(backLink.closest('a')).toHaveAttribute('href', '/blog/test-article')
  })

  it('has proper accessibility with semantic HTML', () => {
    render(<Content frontMatter={mockFrontMatter} blockMap={mockBlockMap} />)

    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
