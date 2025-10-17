import { render } from '@testing-library/react'
import { useTheme } from 'next-themes'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ThemeSwitcher from '@/components/NavBar/ThemeSwitcher'

vi.mock('next-themes', () => ({
  useTheme: vi.fn()
}))

const ThemeProviderMock = ({ children }) => {
  return <div>{children}</div>
}

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    // @ts-expect-error
    ;(useTheme as vi.Mock).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn()
    })
  })

  it('should render correctly', () => {
    const { getByLabelText } = render(<ThemeSwitcher />, {
      wrapper: ThemeProviderMock
    })

    expect(getByLabelText('ThemeSwitcher')).toBeInTheDocument()
  })

  it('should toggle theme on click', () => {
    const { getByLabelText } = render(<ThemeSwitcher />, {
      wrapper: ThemeProviderMock
    })

    getByLabelText('ThemeSwitcher').click()

    expect(useTheme).toHaveBeenCalled()
    expect(useTheme().setTheme).toHaveBeenCalled()
    expect(useTheme().setTheme).toHaveBeenCalledWith('dark')
  })
})
