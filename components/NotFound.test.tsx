import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import NotFound from './NotFound'

vi.mock('next/router', () => {
  return {
    useRouter: () => ({ locale: 'en' })
  }
})
describe('NotFound', () => {
  const props = '404'
  it('should render correctly', () => {
    render(<NotFound statusCode={props} />)
    expect(true).toBeTruthy()
    expect(
      screen.getByText((content, el) => content.startsWith('404 - '))
    ).toBeInTheDocument()
  })

  it('without props statusCode', () => {
    render(<NotFound statusCode='' />)
    expect(
      screen.getByText((content, el) => content.startsWith('Error - '))
    ).toBeInTheDocument()
  })
})
