import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Tags from './Tags'

describe('Tags', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockTags = {
    javascript: 5,
    react: 3,
    typescript: 2
  }

  it('renders null when tags is undefined', () => {
    const { container } = render(<Tags tags={undefined} currentTag='' />)

    expect(container.firstChild).toBeNull()
  })

  it('renders tags with correct structure', () => {
    render(<Tags tags={mockTags} currentTag='' />)

    expect(screen.getByText('javascript (5)')).toBeInTheDocument()
    expect(screen.getByText('react (3)')).toBeInTheDocument()
    expect(screen.getByText('typescript (2)')).toBeInTheDocument()
  })

  it('applies correct CSS classes to container', () => {
    const { container } = render(<Tags tags={mockTags} currentTag='' />)

    const tagContainer = container.querySelector('.tag-container')
    expect(tagContainer).toBeInTheDocument()

    const tagsWrapper = container.querySelector(
      '.flex.flex-wrap.justify-center.mt-4'
    )
    expect(tagsWrapper).toHaveClass(
      'flex',
      'flex-wrap',
      'justify-center',
      'mt-4'
    )
  })

  it('highlights selected tag correctly', () => {
    render(<Tags tags={mockTags} currentTag='javascript' />)

    const selectedTag = screen.getByText('javascript (5)').closest('div')
    expect(selectedTag).toHaveClass('text-gray-100', 'bg-gray-400')

    const unselectedTag = screen.getByText('react (3)').closest('div')
    expect(unselectedTag).toHaveClass('text-gray-400', 'bg-gray-100')
  })

  it('generates correct href for unselected tags', () => {
    render(<Tags tags={mockTags} currentTag='' />)

    const tagLink = screen.getByText('javascript (5)').closest('a')
    expect(tagLink).toHaveAttribute('href', '/tag/javascript')
  })

  it('generates correct href for selected tag', () => {
    render(<Tags tags={mockTags} currentTag='javascript' />)

    const selectedTagLink = screen.getByText('javascript (5)').closest('a')
    expect(selectedTagLink).toHaveAttribute('href', '/search.tsx')
  })

  it('encodes tag names in href correctly', () => {
    const tagsWithEncodedName = {
      'c++': 2,
      'react hooks': 1
    }

    render(<Tags tags={tagsWithEncodedName} currentTag='' />)

    const cppLink = screen.getByText('c++ (2)').closest('a')
    expect(cppLink).toHaveAttribute('href', '/tag/c%2B%2B')

    const reactHooksLink = screen.getByText('react hooks (1)').closest('a')
    expect(reactHooksLink).toHaveAttribute('href', '/tag/react%20hooks')
  })

  it('applies hover states correctly', () => {
    const { container } = render(<Tags tags={mockTags} currentTag='' />)

    const tagDiv = container.querySelector('.m-1.font-medium.rounded-lg')
    expect(tagDiv).toHaveClass(
      'm-1',
      'font-medium',
      'rounded-lg',
      'whitespace-nowrap',
      'hover:text-gray-100',
      'dark:text-gray-300',
      'hover:bg-gray-400',
      'dark:hover:bg-gray-600'
    )
  })

  it('applies correct styling to tag links', () => {
    render(<Tags tags={mockTags} currentTag='' />)

    const tagLink = screen.getByText('javascript (5)').closest('a')
    expect(tagLink).toHaveClass('px-4', 'py-2', 'block')
  })

  it('handles empty tags object', () => {
    render(<Tags tags={{}} currentTag='' />)

    const tagContainer = screen.queryByText(/\(\d+\)/)
    expect(tagContainer).not.toBeInTheDocument()

    // Container should still render
    const { container } = render(<Tags tags={{}} currentTag='' />)
    const tagContainerElement = container.querySelector('.tag-container')
    expect(tagContainerElement).toBeInTheDocument()
  })

  it('handles single tag correctly', () => {
    const singleTag = { javascript: 1 }

    render(<Tags tags={singleTag} currentTag='' />)

    expect(screen.getByText('javascript (1)')).toBeInTheDocument()
  })

  it('handles tags with special characters', () => {
    const specialTags = {
      'test-tag': 1,
      tag_with_underscores: 2,
      'tag-with-dashes': 3
    }

    render(<Tags tags={specialTags} currentTag='' />)

    expect(screen.getByText('test-tag (1)')).toBeInTheDocument()
    expect(screen.getByText('tag_with_underscores (2)')).toBeInTheDocument()
    expect(screen.getByText('tag-with-dashes (3)')).toBeInTheDocument()
  })

  it('maintains the correct order of tags', () => {
    const orderedTags = {
      first: 1,
      second: 2,
      third: 3
    }

    const { container } = render(<Tags tags={orderedTags} currentTag='' />)

    const tags = container.querySelectorAll('a')
    expect(tags[0]).toHaveTextContent('first (1)')
    expect(tags[1]).toHaveTextContent('second (2)')
    expect(tags[2]).toHaveTextContent('third (3)')
  })

  it('applies dark mode classes correctly', () => {
    const { container } = render(<Tags tags={mockTags} currentTag='' />)

    const unselectedTag = container.querySelector(
      '.text-gray-400.bg-gray-100.dark\\:bg-night'
    )
    expect(unselectedTag).toHaveClass(
      'text-gray-400',
      'bg-gray-100',
      'dark:bg-night'
    )
  })

  it('applies responsive design classes', () => {
    const { container } = render(<Tags tags={mockTags} currentTag='' />)

    const tags = container.querySelectorAll('.m-1')
    expect(tags[0]).toHaveClass('whitespace-nowrap')
  })

  it('renders all available tags from object', () => {
    const manyTags = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5
    }

    render(<Tags tags={manyTags} currentTag='' />)

    expect(screen.getByText('a (1)')).toBeInTheDocument()
    expect(screen.getByText('b (2)')).toBeInTheDocument()
    expect(screen.getByText('c (3)')).toBeInTheDocument()
    expect(screen.getByText('d (4)')).toBeInTheDocument()
    expect(screen.getByText('e (5)')).toBeInTheDocument()
  })
})
