import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import Main from './Main'

describe('Main', () => {
  it('should render the children', () => {
    const { getByText } = render(
      <Main>
        <div>TEST</div>
      </Main>,
    )

    const children = getByText('TEST')

    expect(children).toBeInTheDocument()
  })
})
