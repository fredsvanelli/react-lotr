import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import Container from './Container'

describe('Container', () => {
  it('should render the children', () => {
    const { getByText } = render(
      <Container>
        <div>TEST</div>
      </Container>,
    )

    const children = getByText('TEST')

    expect(children).toBeInTheDocument()
  })
})
