'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div className='p-2 ml-1 w-9 h-9 cursor-pointer rounded-lg' />
  }

  return (
    <button
      type='button'
      aria-label='ThemeSwitcher'
      onClick={() => {
        const currentTheme = theme || 'system'
        if (currentTheme === 'light') {
          setTheme('dark')
        } else if (currentTheme === 'dark') {
          setTheme('system')
        } else {
          setTheme('light')
        }
      }}
      className='p-2 ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg dark:text-gray-100'
    >
      {resolvedTheme === 'dark' ? (
        <Moon className='h-5 w-5' />
      ) : (
        <Sun className='h-5 w-5' />
      )}
    </button>
  )
}

export default ThemeSwitcher
