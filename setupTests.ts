import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'util'
import { vi } from 'vitest'
import { createMockRouter } from './testUtils/mocks/nextRouter'

// Setup testing globals
global.TextEncoder = TextEncoder as any
global.TextDecoder = TextDecoder as typeof global.TextDecoder

// Mock next/router globally
vi.mock('next/router', () => ({
  useRouter: vi.fn(() => createMockRouter('en')),
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
