/**
 * Centralized cache configuration for better maintainability
 */

export const CACHE_CONFIG = {
  // ISR (Incremental Static Regeneration) intervals in seconds
  ISR: {
    // Home page - frequently accessed, updates often
    HOME: 15 * 60, // 15 minutes

    // Individual posts - change less frequently, longer cache
    SLUG: 60 * 60, // 1 hour

    // Newsletter - moderate update frequency
    NEWS: 30 * 60, // 30 minutes

    // Error recovery - shorter interval for quick fixes
    ERROR: 1 * 60, // 1 minute

    // API routes - real-time content
    API: 10 // 10 seconds
  },

  // In-memory caching for data fetching functions
  MEMORY: {
    // Post lists change frequently
    POSTS: 5 * 60, // 5 minutes

    // Individual post blocks are more static
    POST_BLOCKS: 30 * 60, // 30 minutes

    // Tags and metadata rarely change
    METADATA: 60 * 60 // 1 hour
  },

  // Browser caching for static assets
  BROWSER: {
    // Images - optimized formats can be cached longer
    IMAGES: 60 * 60 * 24, // 24 hours

    // CSS/JS files - versioned, can be cached long-term
    ASSETS: 60 * 60 * 24 * 365, // 1 year

    // Fonts - rarely change, very long cache
    FONTS: 60 * 60 * 24 * 365 // 1 year
  }
} as const

// Type-safe cache durations
export type CacheKey =
  | keyof typeof CACHE_CONFIG.ISR
  | keyof typeof CACHE_CONFIG.MEMORY

// Helper function to get duration with context
export const getCacheDuration = (type: 'ISR' | 'MEMORY', key: CacheKey) => {
  return CACHE_CONFIG[type][key]
}
