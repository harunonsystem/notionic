/// <reference lib="dom" />
import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'node:util'
import { vi, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { createMockRouter } from './testUtils/mocks/nextRouter'

// Setup testing globals
global.TextEncoder = TextEncoder as any
global.TextDecoder = TextDecoder as typeof global.TextDecoder

// Mock IntersectionObserver with proper API fidelity
class IntersectionObserverMock {
  private callback: IntersectionObserverCallback
  private options: IntersectionObserverInit
  private observedElements: Set<Element> = new Set()

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.callback = callback
    this.options = options || {}
  }

  observe(element: Element) {
    this.observedElements.add(element)
    // Call callback with synthetic entries to mimic real behavior
    const entry: IntersectionObserverEntry = {
      target: element,
      isIntersecting: true,
      intersectionRatio: 1,
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRect: element.getBoundingClientRect(),
      rootBounds: null,
      time: Date.now()
    } as IntersectionObserverEntry
    this.callback([entry], this as any)
  }

  unobserve(element: Element) {
    this.observedElements.delete(element)
  }

  disconnect() {
    this.observedElements.clear()
  }

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
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
