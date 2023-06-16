import { expect, describe, it } from 'vitest'

import { formatMoney, getMovieCover, plural } from 'helpers'

describe('plural', () => {
  it('should return the singular string when count is 1', () => {
    const result = plural('singular', 'plural', 1)

    expect(result).toBe('singular')
  })

  it('should return the plural string when count is not 1', () => {
    const result = plural('singular', 'plural', 0)
    const result2 = plural('singular', 'plural', 2)

    expect(result).toBe('plural')
    expect(result2).toBe('plural')
  })
})

describe('getMovieCover', () => {
  it('should return the image path string', () => {
    const result = getMovieCover('fake-id')

    expect(result).toBe('/movie-covers/fake-id.jpg')
  })
})

describe('formatMoney', () => {
  it('should return the string in millions when value is lower than 1000', () => {
    const result = formatMoney(999)

    expect(result).toBe('$999 million')
  })

  it('should return the string in billions when value is higher than 1000', () => {
    const result = formatMoney(1234)

    expect(result).toBe('$1.2 billion')
  })
})
