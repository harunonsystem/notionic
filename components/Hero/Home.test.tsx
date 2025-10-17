import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { setupMockRouter } from '@/testUtils/mocks/nextRouter'
import Hero from './Home'

// Mock dependencies
vi.mock('@/lib/lang', () => ({
  lang: {
    en: {
      HERO: {
        HOME: {
          CONTACT_BUTTON_DES: 'Get in touch',
          CONTACT_BUTTON: 'Contact Me',
          RSS_BUTTON: 'Copy RSS Link'
        },
        RSS_BUTTON_DES: 'Subscribe to RSS feed',
        RSS_BUTTON_DES_COPIED: 'RSS link copied!',
        RSS_BUTTON_COPIED: 'Copied!'
      }
    }
  }
}))

vi.mock('../Common/Social', () => ({
  default: () => <div data-testid='social-links'>Social Links</div>
}))

vi.mock('./Avatar', () => ({
  default: ({ className }: { className: string }) => (
    <div data-testid='avatar' className={className}>
      Avatar
    </div>
  )
}))

vi.mock('@/components/Post/NotionRenderer', () => ({
  default: ({ className }: { className: string }) => (
    <div data-testid='notion-renderer' className={className}>
      Notion Content
    </div>
  )
}))

vi.mock('@/blog.config', () => ({
  BLOG: {
    title: 'harunonsystem blog',
    author: 'harunonsystem',
    email: 'harunonsystem@gmail.com',
    link: 'https://harunonsystem.com'
  }
}))

// Mock window.clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined)
  },
  writable: true
})

describe('Hero', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
    setupMockRouter('en')
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders correctly with all components', () => {
    const mockBlockMap = {} as any

    render(<Hero blockMap={mockBlockMap} />)

    expect(screen.getByTestId('notion-renderer')).toBeInTheDocument()
    expect(screen.getByTestId('social-links')).toBeInTheDocument()
    expect(screen.getByTestId('avatar')).toBeInTheDocument()
    expect(screen.getByText('Contact Me')).toBeInTheDocument()
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
    expect(screen.getByText('Copy RSS Link')).toBeInTheDocument()
    expect(screen.getByText('Subscribe to RSS feed')).toBeInTheDocument()
  })

  it('renders RSS button correctly', () => {
    const mockBlockMap = {} as any
    render(<Hero blockMap={mockBlockMap} />)

    const rssButton = screen.getByText('Copy RSS Link')
    expect(rssButton).toBeInTheDocument()
    expect(rssButton.closest('button')).toBeInTheDocument()
  })

  it('renders contact button with correct link', () => {
    const mockBlockMap = {} as any
    render(<Hero blockMap={mockBlockMap} />)

    const contactButton = screen.getByText('Contact Me')
    expect(contactButton.closest('a')).toHaveAttribute('href', '/contact')
  })

  it('copies RSS link to clipboard when RSS button is clicked', async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText
      },
      writable: true
    })

    const mockBlockMap = {} as any
    render(<Hero blockMap={mockBlockMap} />)

    const rssButton = screen.getByText('Copy RSS Link')
    await fireEvent.click(rssButton)

    expect(mockWriteText).toHaveBeenCalledWith('https://harunonsystem.com/feed')
  })

  it('shows copied state after RSS button click', async () => {
    const mockBlockMap = {} as any
    render(<Hero blockMap={mockBlockMap} />)

    const rssButton = screen.getByText('Copy RSS Link')
    await fireEvent.click(rssButton)

    // Should show copied state
    expect(screen.getByText('Copied!')).toBeInTheDocument()
    expect(screen.getByText('RSS link copied!')).toBeInTheDocument()

    // Should not show original text
    expect(screen.queryByText('Copy RSS Link')).not.toBeInTheDocument()
  })

  it('has correct container structure and styling', () => {
    const mockBlockMap = {} as any
    render(<Hero blockMap={mockBlockMap} />)

    const container = screen.getByText('Contact Me').closest('.container')
    expect(container).toHaveClass(
      'mx-auto',
      'flex',
      'px-5',
      'py-2',
      'mb-10',
      'md:flex-row',
      'flex-col',
      'items-center'
    )
  })

  it('renders left and right sections with correct proportions', () => {
    const mockBlockMap = {} as any
    render(<Hero blockMap={mockBlockMap} />)

    const leftSection = screen
      .getByTestId('notion-renderer')
      .closest('.md\\:w-3\\/5')
    const rightSection = screen.getByTestId('avatar').closest('.w-2\\/5')

    expect(leftSection).toBeInTheDocument()
    expect(rightSection).toBeInTheDocument()
  })
})
