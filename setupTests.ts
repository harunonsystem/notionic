import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'node:util'
import { vi, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { createMockRouter } from './testUtils/mocks/nextRouter'

// Setup testing globals
global.TextEncoder = TextEncoder as any
global.TextDecoder = TextDecoder as typeof global.TextDecoder

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor() {
    // callback is the intersection observer callback
  }

  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

global.IntersectionObserver = IntersectionObserverMock as any

// Cleanup after each test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

// Mock next/router globally
vi.mock('next/router', () => ({
  useRouter: vi.fn(() => createMockRouter({ locale: 'en' })),
  Router: {
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn()
    }
  }
}))

// Mock fetch globally
global.fetch = vi.fn()

// Mock alert globally
Object.defineProperty(window, 'alert', {
  value: vi.fn(),
  writable: true
})
