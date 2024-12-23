import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import ShareButton from './ShareButton'
import { describe, expect, test, vi } from 'vitest'

vi.mock('next/router', () => ({
  useRouter: () => ({ locale: 'en' })
}))

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve())
  }
})

Object.assign(window, {
  open: vi.fn()
})
describe('ShareButton', () => {
  test('renders ShareButton', () => {
    render(<ShareButton title='title' />)
    expect(screen.getByText('Copy Title and URL')).toBeInTheDocument()
  })

  test('clicks CopyTitleAndUrl Button', () => {
    render(<ShareButton title='title' />)
    const btn = screen.getByTestId('copy-title-and-url')
    act(() => {
      btn.click()
    })
    expect(screen.getByText('Copied!')).toBeInTheDocument()
  })

  test('clicks ShareTwitter Button', () => {
    render(<ShareButton title='title' />)
    const btn = screen.getByTestId('share-twitter')
    act(() => {
      btn.click()
    })
    expect(window.open).toBeCalled()
  })
})
