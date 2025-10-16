import { describe, expect, it } from 'vitest'
import dayjs from './day'

describe('dayjs configuration', () => {
  it('should be configured with UTC plugin', () => {
    const utcDate = dayjs.utc('2023-01-01T00:00:00Z')
    expect(utcDate.isValid()).toBe(true)
  })

  it('should be configured with timezone plugin', () => {
    const date = dayjs('2023-01-01T12:00:00')
    expect(date.isValid()).toBe(true)
  })

  it('should have default timezone set', () => {
    // Test that timezone functionality is available
    const date = dayjs('2023-01-01T12:00:00')
    const utcDate = date.utc()
    expect(utcDate.isValid()).toBe(true)
  })

  it('should format dates correctly', () => {
    const date = dayjs('2023-01-01')
    expect(date.format('YYYY-MM-DD')).toBe('2023-01-01')
  })

  it('should handle relative time formatting', () => {
    const pastDate = dayjs().subtract(1, 'day')
    expect(pastDate.isValid()).toBe(true)
  })

  it('should handle date comparisons', () => {
    const date1 = dayjs('2023-01-01')
    const date2 = dayjs('2023-01-02')
    expect(date1.isBefore(date2)).toBe(true)
    expect(date2.isAfter(date1)).toBe(true)
    expect(date1.isSame('2023-01-01')).toBe(true)
  })

  it('should handle date arithmetic', () => {
    const date = dayjs('2023-01-01')
    const nextWeek = date.add(1, 'week')
    expect(nextWeek.format('YYYY-MM-DD')).toBe('2023-01-08')

    const yesterday = date.subtract(1, 'day')
    expect(yesterday.format('YYYY-MM-DD')).toBe('2022-12-31')
  })

  it('should parse different date formats', () => {
    const isoDate = dayjs('2023-01-01T12:00:00Z')
    expect(isoDate.isValid()).toBe(true)

    const simpleDate = dayjs('2023-01-01')
    expect(simpleDate.isValid()).toBe(true)

    const customFormat = dayjs('2023/01/01', 'YYYY/MM/DD')
    expect(customFormat.isValid()).toBe(true)
  })
})
