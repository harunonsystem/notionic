import { describe, expect, it } from 'vitest'
import { dateToUnixTimestamp, formatDateWithTimezone } from './timezone'

describe('timezone utilities', () => {
  describe('dateToUnixTimestamp', () => {
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

    it('should return null for null input', () => {
      const timestamp = dateToUnixTimestamp(null)
      expect(timestamp).toBeNull()
    })

    it('should return null for undefined input', () => {
      const timestamp = dateToUnixTimestamp(undefined)
      expect(timestamp).toBeNull()
    })

    it('should return null for invalid date string', () => {
      const timestamp = dateToUnixTimestamp('invalid-date')
      expect(timestamp).toBeNull()
    })

    it('should return null for empty string', () => {
      const timestamp = dateToUnixTimestamp('')
      expect(timestamp).toBeNull()
    })

    it('should handle numeric timestamps', () => {
      const timestamp = dateToUnixTimestamp(1672531200000)
      expect(typeof timestamp).toBe('number')
      expect(timestamp).toBe(1672531200000)
    })

    describe('timezone conversion', () => {
      it('should apply timezone offset to date conversion', () => {
        const utcTimestamp = dateToUnixTimestamp('2023-01-01T00:00:00Z')
        const tokyoTimestamp = dateToUnixTimestamp(
          '2023-01-01T00:00:00Z',
          'Asia/Tokyo'
        )

        expect(typeof utcTimestamp).toBe('number')
        expect(typeof tokyoTimestamp).toBe('number')
        expect(utcTimestamp).not.toEqual(tokyoTimestamp)
      })

      it('should handle different timezones', () => {
        const nyTimestamp = dateToUnixTimestamp(
          '2023-01-01T12:00:00Z',
          'America/New_York'
        )
        const londonTimestamp = dateToUnixTimestamp(
          '2023-01-01T12:00:00Z',
          'Europe/London'
        )

        expect(typeof nyTimestamp).toBe('number')
        expect(typeof londonTimestamp).toBe('number')
        expect(nyTimestamp).not.toEqual(londonTimestamp)
      })

      it('should return null with invalid timezone', () => {
        try {
          const timestamp = dateToUnixTimestamp(
            '2023-01-01T00:00:00Z',
            'Invalid/Timezone'
          )
          expect(timestamp).toBeNull()
        } catch (error) {
          expect(error).toBeDefined()
        }
      })

      it('should preserve null on invalid input with timezone', () => {
        const timestamp = dateToUnixTimestamp('not-a-date', 'Asia/Tokyo')
        expect(timestamp).toBeNull()
      })
    })

    it('should return null for numeric string input', () => {
      const timestamp = dateToUnixTimestamp('1672531200000')
      expect(timestamp).toBeNull()
    })
  })

  describe('formatDateWithTimezone', () => {
    it('should format date with timezone', () => {
      const formatted = formatDateWithTimezone('2023-01-15T12:00:00Z', 'ja-JP')
      expect(typeof formatted).toBe('string')
      expect(formatted).toMatch(/\d{4}|1月|1\d/)
    })

    it('should format date with default locale', () => {
      const formatted = formatDateWithTimezone('2023-01-15T12:00:00Z')
      expect(typeof formatted).toBe('string')
    })
  })
})
