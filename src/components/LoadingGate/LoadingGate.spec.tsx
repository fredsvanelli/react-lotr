import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import LoadingGate from './LoadingGate'

describe('LoadingGate', () => {
  it('should render the children when isLoading is false', () => {
    const { getByText } = render(<LoadingGate>Children</LoadingGate>)

    expect(getByText('Children')).toBeInTheDocument()
  })

  it('should render the loading component when isLoading is true', () => {
    const { container } = render(<LoadingGate isLoading>Test</LoadingGate>)

    expect(
      container.querySelector('img[src="/src/assets/ellipsis.svg"]'),
    ).toBeInTheDocument()
  })

  it('should render the fallback element when it exists and isLoading is true', () => {
    const { getByText } = render(
      <LoadingGate isLoading fallback={<div>Fallback</div>}>
        Test
      </LoadingGate>,
    )

    expect(getByText('Fallback')).toBeInTheDocument()
  })
})
