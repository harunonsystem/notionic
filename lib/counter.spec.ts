// vitest sample
import { expect, test } from 'vitest'

test('counter', async () => {
  const intialCount = 0
  const { counter } = await import('./counter')

  expect(counter(intialCount)).toBe(1)
})
