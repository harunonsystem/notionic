import type { NextRouter } from 'next/router'
import { vi } from 'vitest'

export interface MockRouterConfig {
  locale?: string
  pathname?: string
  query?: Record<string, any>
  asPath?: string
  localeDomain?: boolean
  isReady?: boolean
  isFallback?: boolean
  isPreview?: boolean
}

// Create a complete mock router factory with override support
export const createMockRouter = (
  overrides: MockRouterConfig = {}
): NextRouter => {
  const {
    locale = 'en',
    pathname = '/',
    query = {},
    asPath = pathname,
    localeDomain = true,
    isReady = false,
    isFallback = false,
    isPreview = false
  } = overrides

  return {
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    reload: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn()
    },
    isReady,
    isFallback,
    isPreview,
    locale,
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    domainLocales: [],
    pathname,
    query,
    asPath,
    route: pathname,
    basePath: '',
    isLocaleDomain: localeDomain,
    ...overrides
  }
}

// Global mock for test isolation
export const mockUseRouter = vi.fn()

// Global router mock setup with improved mock
vi.mock('next/router', () => ({
  useRouter: () => mockUseRouter(),
  Router: {
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn()
    },
    push: vi.fn(),
    replace: vi.fn()
  }
}))

// Improved main API with backward compatibility
export const setupMockRouter = (
  configOrLocale: MockRouterConfig | string = {}
): void => {
  if (typeof configOrLocale === 'string') {
    // Backward compatibility: support old API (locale only)
    mockUseRouter.mockReturnValue(createMockRouter({ locale: configOrLocale }))
  } else {
    // New API: support configuration object
    mockUseRouter.mockReturnValue(createMockRouter(configOrLocale))
  }
}

// Helper for simple locale-only setup (backward compatibility)
export const setupMockRouterWithLocale = (
  locale: string,
  pathname: string = '/'
): void => {
  setupMockRouter({ locale, pathname })
}

// Helper for path-based testing
export const setupMockRouterWithPath = (
  pathname: string,
  query: Record<string, any> = {}
): void => {
  setupMockRouter({ pathname, query })
}

// Helper for advanced path setup with locale
export const setupMockRouterWithCustomPath = (
  locale = 'en',
  pathname = '/',
  query: Record<string, any> = {}
): void => {
  setupMockRouter({ locale, pathname, query })
}

// Utility to get the current mock router instance
export const getMockRouter = (): NextRouter => {
  return mockUseRouter.mock.results[0]?.value || createMockRouter()
}

// Utility to reset mock state
export const resetMockRouter = (): void => {
  vi.clearAllMocks()
}
