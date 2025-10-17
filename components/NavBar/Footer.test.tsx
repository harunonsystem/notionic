import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setupMockRouter } from '@/testUtils/mocks/nextRouter'
import Footer from './Footer'

// Mock dependencies
vi.mock('@/blog.config', () => ({
  BLOG: {
    author: 'Test Author',
    since: 2022,
    pagesShow: {
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
        CONTACT: 'Contact'
      },
      FOOTER: {
        COPYRIGHT_START: 'Powered by ',
        COPYRIGHT_NAME: 'Notionic',
        COPYRIGHT_END: '',
        ORIGIN_REPOSITORY_DESCRIPTION: 'Original repository: ',
        ORIGIN_REPOSITORY_LINK: 'https://github.com/harunonsystem/notionic'
      }
    }
  }
}))

vi.mock('../Common/Social', () => ({
  default: () => <div data-testid='social-links'>Social Links</div>
}))

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setupMockRouter({ locale: 'en', pathname: '/' })
  })

  it('renders footer with basic structure', () => {
    render(<Footer fullWidth={false} />)

    expect(screen.getByTestId('social-links')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders copyright information correctly', () => {
    render(<Footer fullWidth={false} />)

    const year = new Date().getFullYear()
    expect(
      screen.getByText(`© 2022 - ${year} | Test Author`)
    ).toBeInTheDocument()
    expect(screen.getByText(/Powered by/)).toBeInTheDocument()
    expect(screen.getByText('Notionic')).toBeInTheDocument()
  })

  it('renders repository links correctly', () => {
    render(<Footer fullWidth={false} />)

    expect(screen.getByText('Original repository:')).toBeInTheDocument()
    const repositoryLink = screen.getByText('github.com/harunonsystem/notionic')
    expect(repositoryLink).toBeInTheDocument()
    expect(repositoryLink.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/harunonsystem/notionic'
    )
  })

  it('applies correct width classes when fullWidth is false', () => {
    const { container } = render(<Footer fullWidth={false} />)
    const footerComponent = container.querySelector('.mt-6')
    expect(footerComponent).toHaveClass('max-w-3xl', 'md:px-8')
  })

  it('applies correct width classes when fullWidth is true', () => {
    const { container } = render(<Footer fullWidth={true} />)
    const footerComponent = container.querySelector('.mt-6')
    expect(footerComponent).toHaveClass('px-4', 'md:px-24')
  })

  it('checks active menu routing', () => {
    setupMockRouter({ locale: 'en', pathname: '/contact' })
    render(<Footer fullWidth={false} />)

    const contactLink = screen.getByText('Contact')
    expect(contactLink).toBeInTheDocument()
  })

  it('does not highlight when not on active page', () => {
    setupMockRouter({ locale: 'en', pathname: '/' })
    render(<Footer fullWidth={false} />)

    const contactLink = screen.getByText('Contact').closest('li')
    expect(contactLink).not.toHaveClass('bg-gray-200')
  })

  it('displays social links only on desktop', () => {
    render(<Footer fullWidth={false} />)
    const socialContainer = screen.getByTestId('social-links').parentElement
    expect(socialContainer).toHaveClass('hidden', 'md:flex')
  })

  it('has correct footer structure with borders', () => {
    const { container } = render(<Footer fullWidth={false} />)
    const footerContent = container.querySelector('footer')
    const borderDiv = container.querySelector('.border-b')

    expect(footerContent).toBeInTheDocument()
    expect(borderDiv).toHaveClass('dark:border-gray-600')
  })
})
