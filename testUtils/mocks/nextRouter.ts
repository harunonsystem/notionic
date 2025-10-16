import type { NextRouter } from 'next/router'

import { vi } from 'vitest'

export const createMockRouter = (locale = 'en'): NextRouter => ({
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
  isReady: false,
  isFallback: false,
  isPreview: false,
  locale,
  locales: ['en', 'ja'],
  defaultLocale: 'en',
  domainLocales: [],
  pathname: '/',
  query: {},
  asPath: '/',
  route: '/',
  basePath: '',
  isLocaleDomain: true
})

export const mockUseRouter = vi.fn()

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: mockUseRouter,
  Router: {
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn()
    }
  }
}))

export const setupMockRouter = (locale = 'en'): void => {
  mockUseRouter.mockReturnValue(createMockRouter(locale))
}

export const setupMockRouterWithCustomPath = (
  locale = 'en',
  pathname = '/',
  query = {}
): void => {
  mockUseRouter.mockReturnValue({
    ...createMockRouter(locale),
    pathname,
    query: query as any,
    asPath: pathname
  })
}
