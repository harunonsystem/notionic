import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { setupMockRouter } from '@/testUtils/mocks/nextRouter'
import Header from './Header'

// Mock dependencies
vi.mock('@/blog.config', () => ({
  BLOG: {
    title: 'Test Blog',
    description: 'Test Description',
    path: '',
    autoCollapsedNavBar: false,
    pagesShow: {
      newsletter: true,
      notes: true,
      projects: true,
      contact: true,
      books: true,
      friends: true
    }
  }
}))

vi.mock('@/lib/lang', () => ({
  lang: {
    en: {
      NAV: {
        INDEX: 'Home',
        NEWSLETTER: 'Newsletter',
        NOTES: 'Notes',
        PROJECTS: 'Projects',
        SEARCH: 'Search'
      }
    }
  }
}))

vi.mock('../Common/Social', () => ({
  default: () => <div data-testid='social-links'>Social Links</div>
}))

vi.mock('./ThemeSwitcher', () => ({
  default: () => <div data-testid='theme-switcher'>Theme Switcher</div>
}))

vi.mock('./LangSwitcher', () => ({
  default: () => <div data-testid='lang-switcher'>Lang Switcher</div>
}))

describe('Header', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
    setupMockRouter({ locale: 'en', pathname: '/' })
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders header with basic structure', () => {
    render(<Header />)

    expect(screen.getByAltText('Test Blog')).toBeInTheDocument()
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument()
    expect(screen.getByTestId('lang-switcher')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)

    // Check for navigation text content
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Newsletter')).toBeInTheDocument()
    expect(screen.getByText('Notes')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  it('handles mobile menu toggle', async () => {
    render(<Header />)

    const menuButtons = screen.getAllByRole('button', { name: 'Menu' })
    const menuButton = menuButtons[0]

    // Initially mobile menu should be hidden
    expect(screen.queryByText('Social Links')).not.toBeInTheDocument()

    // Open mobile menu
    await act(async () => {
      fireEvent.click(menuButton)
    })

    // Should show mobile menu with social links
    expect(screen.getByTestId('social-links')).toBeInTheDocument()
  })

  it('handles window scroll events correctly', () => {
    const observeMock = vi.fn()

    class IntersectionObserverMock {
      constructor(_callback?: any) {}

      observe = observeMock
      unobserve = vi.fn()
      disconnect = vi.fn()
    }

    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock as any)

    render(<Header />)

    // Fast forward for intersection observer callback
    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(observeMock).toHaveBeenCalled()
  })

  it('applies correct width classes based on fullWidth prop', () => {
    const { container } = render(<Header fullWidth={true} />)
    const stickyNav = container.querySelector('.sticky-nav')
    expect(stickyNav).toHaveClass('px-4', 'md:px-24')
  })

  it('applies default width classes when fullWidth is false', () => {
    const { container } = render(<Header fullWidth={false} />)
    const stickyNav = container.querySelector('.sticky-nav')
    expect(stickyNav).toHaveClass('max-w-3xl', 'px-4')
  })

  it('cleans up intersection observer on unmount', () => {
    const unobserveMock = vi.fn()

    class IntersectionObserverMock {
      constructor(_callback?: any) {}

      observe = vi.fn()
      unobserve = unobserveMock
      disconnect = vi.fn()
    }

    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock as any)

    const { unmount } = render(<Header />)
    unmount()

    expect(unobserveMock).toHaveBeenCalled()
  })
})
