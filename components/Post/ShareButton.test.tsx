import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { setupMockRouter } from '@/testUtils/mocks/nextRouter'
import ShareButton from './ShareButton'

// Mock the lang library
vi.mock('@/lib/lang', () => ({
  lang: {
    en: {
      LAYOUT: {
        COPY_TITLE_AND_URL_BUTTON_TEXT: 'Copy title and URL',
        COPY_TITLE_AND_URL_BUTTON_TEXT_COPIED: 'Copied!',
        SHARE_TWITTER_BUTTON_TEXT: 'Share on Twitter'
      }
    }
  }
}))

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: 'https://example.com/test'
  },
  writable: true
})

describe('ShareButton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Reset all mocks
    vi.clearAllMocks()

    // Setup mock router
    setupMockRouter('en')

    // Default clipboard API mock
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined)
      },
      writable: true
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders correctly with title', () => {
    render(<ShareButton title='Test Post' />)

    expect(screen.getByText('Copy title and URL')).toBeInTheDocument()
    expect(screen.getByText('Share on Twitter')).toBeInTheDocument()
  })

  describe('Clipboard API integration', () => {
    it('copies text successfully using clipboard API', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined)
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: mockWriteText
        },
        writable: true
      })

      render(<ShareButton title='Test Post' />)

      const copyButton = screen.getByText('Copy title and URL')
      await act(async () => {
        fireEvent.click(copyButton)
      })

      expect(mockWriteText).toHaveBeenCalledWith(
        'Test Post https://example.com/test'
      )
      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })

    it('shows copied state temporarily', async () => {
      render(<ShareButton title='Test Post' />)

      const copyButton = screen.getByText('Copy title and URL')
      await act(async () => {
        fireEvent.click(copyButton)
      })

      expect(screen.getByText('Copied!')).toBeInTheDocument()

      // Fast-forward time
      await act(async () => {
        vi.advanceTimersByTime(1000)
      })

      expect(screen.getByText('Copy title and URL')).toBeInTheDocument()
    })
  })

  describe('Fallback to execCommand', () => {
    beforeEach(() => {
      // Remove clipboard API to force fallback
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true
      })

      // Mock document.execCommand
      document.execCommand = vi.fn().mockReturnValue(true)
    })

    it('uses execCommand fallback when clipboard API is unavailable', async () => {
      const mockExecCommand = vi.fn().mockReturnValue(true)
      vi.spyOn(document.body, 'appendChild')
      vi.spyOn(document.body, 'removeChild')
      document.execCommand = mockExecCommand

      render(<ShareButton title='Test Post' />)

      const copyButton = screen.getByText('Copy title and URL')
      await act(async () => {
        fireEvent.click(copyButton)
      })

      expect(screen.getByText('Copied!')).toBeInTheDocument()
    })
  })

  describe('Twitter sharing', () => {
    beforeEach(() => {
      // Mock window.open
      window.open = vi.fn()
    })

    it('opens Twitter share dialog with encoded parameters', () => {
      render(<ShareButton title='Test Post & Special Chars!' />)

      const twitterButton = screen.getByText('Share on Twitter')
      fireEvent.click(twitterButton)

      expect(window.open).toHaveBeenCalledWith(
        'https://x.com/intent/tweet?text=Test%20Post%20%26%20Special%20Chars!&url=https%3A%2F%2Fexample.com%2Ftest',
        '_blank',
        'width=600,height=400,noopener,noreferrer'
      )
    })

    it('sets opener to null for security', () => {
      const mockWindow = { opener: {} }
      window.open = vi.fn().mockReturnValue(mockWindow)

      render(<ShareButton title='Test Post' />)

      const twitterButton = screen.getByText('Share on Twitter')
      fireEvent.click(twitterButton)

      expect(mockWindow.opener).toBeNull()
    })
  })
})
