import { describe, expect, it } from 'vitest'
import { dateToUnixTimestamp, formatDateWithTimezone } from './timezone'

describe('timezone utilities', () => {
  it('should convert date string to unix timestamp', () => {
    const timestamp = dateToUnixTimestamp('2023-01-01T00:00:00Z')
    expect(typeof timestamp).toBe('number')
    expect(timestamp).toBeGreaterThan(0)
  })

  it('should handle different date formats', () => {
    const timestamp1 = dateToUnixTimestamp('2023-01-01')
    const timestamp2 = dateToUnixTimestamp('2023-01-01T00:00:00Z')
    expect(typeof timestamp1).toBe('number')
    expect(typeof timestamp2).toBe('number')
  })

  it('should format date with timezone', () => {
    const formatted = formatDateWithTimezone('2023-01-15T12:00:00Z', 'ja-JP')
    expect(typeof formatted).toBe('string')
    expect(formatted).toMatch(/\d{4}年.*1月.*\d{1,2}日/)
  })

  it('should format date with default locale', () => {
    const formatted = formatDateWithTimezone('2023-01-15T12:00:00Z')
    expect(typeof formatted).toBe('string')
  })
})
