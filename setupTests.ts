import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'node:util'
import { vi, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { createMockRouter } from './testUtils/mocks/nextRouter'

// Setup testing globals
global.TextEncoder = TextEncoder as any
global.TextDecoder = TextDecoder as typeof global.TextDecoder

/**
 * Mock IntersectionObserver with proper API fidelity
 * @param {IntersectionObserverCallback} callback
 * @param {IntersectionObserverInit} [options]
 */
class IntersectionObserverMock {
  /** @type {IntersectionObserverCallback} */
  private callback

  /** @type {IntersectionObserverInit} */
  private options

  /** @type {Set<Element>} */
  private observedElements = new Set()

  constructor(callback, options) {
    this.callback = callback
    this.options = options || {}
  }

  observe(element) {
    this.observedElements.add(element)
    // Call callback with synthetic entries to mimic real behavior
    const entry = {
      target: element,
      isIntersecting: true,
      intersectionRatio: 1,
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRect: element.getBoundingClientRect(),
      rootBounds: null,
      time: Date.now()
    }
    this.callback([entry], this)
  }

  unobserve(element) {
    this.observedElements.delete(element)
  }

  disconnect() {
    this.observedElements.clear()
  }

  takeRecords() {
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
