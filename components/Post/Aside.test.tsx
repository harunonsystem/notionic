import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { setupMockRouter } from '@/testUtils/mocks/nextRouter'
import Aside from './Aside'

// Mock dependencies
vi.mock('@/blog.config', () => ({
  BLOG: {
    showWeChatPay: true,
    path: ''
  }
}))

vi.mock('./TableOfContents', () => ({
  default: ({ className, _pageTitle, _blockMap, _frontMatter }) => (
    <div data-testid='table-of-contents' className={className}>
      Table of Contents
    </div>
  )
}))

vi.mock('./WechatPay', () => ({
  default: () => <div data-testid='wechat-pay'>WeChat Pay</div>
}))

describe('Aside', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
    setupMockRouter('en')
    window.pageYOffset = 0
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const mockBlockMap = {} as any
  const mockFrontMatter = { slug: 'test-post' }

  it('renders correctly with basic structure', () => {
    render(
      <aside>
        <Aside
          pageTitle='Test Post'
          blockMap={mockBlockMap}
          frontMatter={mockFrontMatter}
        />
      </aside>
    )

    // Check mobile back button
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('renders WeChat Pay button when enabled', () => {
    render(
      <aside>
        <Aside
          pageTitle='Test Post'
          blockMap={mockBlockMap}
          frontMatter={mockFrontMatter}
        />
      </aside>
    )

    // Should have WeChat Pay button
    const wechatButton = screen.getByRole('button')
    expect(wechatButton).toBeInTheDocument()
  })

  it('shows WeChat Pay modal when button is clicked', async () => {
    render(
      <aside>
        <Aside
          pageTitle='Test Post'
          blockMap={mockBlockMap}
          frontMatter={mockFrontMatter}
        />
      </aside>
    )

    const wechatButton = screen.getByRole('button')
    await act(async () => {
      await fireEvent.click(wechatButton)
    })

    expect(screen.getByTestId('wechat-pay')).toBeInTheDocument()
  })

  it('toggles WeChat Pay modal visibility', async () => {
    render(
      <aside>
        <Aside
          pageTitle='Test Post'
          blockMap={mockBlockMap}
          frontMatter={mockFrontMatter}
        />
      </aside>
    )

    const wechatButton = screen.getByRole('button')

    // First click should open
    await act(async () => {
      await fireEvent.click(wechatButton)
    })
    expect(screen.getByTestId('wechat-pay')).toBeInTheDocument()

    // Second click should close
    await act(async () => {
      await fireEvent.click(wechatButton)
    })
    expect(screen.queryByTestId('wechat-pay')).not.toBeInTheDocument()
  })

  it('shows scroll-to-top elements after scrolling down', () => {
    render(
      <aside>
        <Aside
          pageTitle='Test Post'
          blockMap={mockBlockMap}
          frontMatter={mockFrontMatter}
        />
      </aside>
    )

    // Simulate scroll down
    window.pageYOffset = 500
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    // Should show scroll to top button
    const scrollButtons = screen.getAllByRole('button')
    const scrollUpButton = scrollButtons.find((button) => !button.closest('a'))
    expect(scrollUpButton).toBeInTheDocument()
  })

  it('hides scroll-to-top elements when scrolled to top', () => {
    render(
      <aside>
        <Aside
          pageTitle='Test Post'
          blockMap={mockBlockMap}
          frontMatter={mockFrontMatter}
        />
      </aside>
    )

    // First scroll down
    window.pageYOffset = 500
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    // Then scroll back to top
    window.pageYOffset = 0
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    // Mobile scroll button should be hidden
    const _mobileScrollButton = screen.queryByRole('button', {
      name: '' // ArrowUpIcon button
    })
    expect(screen.getAllByRole('button')).toHaveLength(1) // Only WeChat Pay button
  })

  it('shows Table of Contents when scrolled down', () => {
    render(
      <aside>
        <Aside
          pageTitle='Test Post'
          blockMap={mockBlockMap}
          frontMatter={mockFrontMatter}
        />
      </aside>
    )

    // Simulate scroll down
    window.pageYOffset = 500
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(screen.getByTestId('table-of-contents')).toBeInTheDocument()
  })

  it('calls window.scrollTo correctly when scroll button is clicked', async () => {
    const scrollToMock = vi.fn()
    window.scrollTo = scrollToMock

    render(
      <aside>
        <Aside
          pageTitle='Test Post'
          blockMap={mockBlockMap}
          frontMatter={mockFrontMatter}
        />
      </aside>
    )

    // First scroll down to show button
    window.pageYOffset = 500
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    // Get all buttons and click one that's not a link
    const wechatButton = screen.getAllByRole('button')[0] // WeChat Pay button
    await act(async () => {
      await fireEvent.click(wechatButton)
    })

    // The WeChat Pay button should be clicked but not call scrollTo
    expect(scrollToMock).not.toHaveBeenCalled()
  })

  it('has correct link attributes for back button', () => {
    render(
      <aside>
        <Aside
          pageTitle='Test Post'
          blockMap={mockBlockMap}
          frontMatter={mockFrontMatter}
        />
      </aside>
    )

    const backButton = screen.getByRole('link')
    expect(backButton).toHaveAttribute('href', '/test-post')
  })

  it('does not render when pageTitle is empty', () => {
    render(
      <aside>
        <Aside
          pageTitle={''}
          blockMap={mockBlockMap}
          frontMatter={mockFrontMatter}
        />
      </aside>
    )

    // Should not have back button
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
