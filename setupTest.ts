import matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { beforeEach, vi, expect } from 'vitest'

expect.extend(matchers)

beforeEach(() => {
  cleanup()
  vi.resetAllMocks()
})
