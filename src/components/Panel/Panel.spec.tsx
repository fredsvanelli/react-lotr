import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import Panel from './Panel'

describe('Panel', () => {
  it('should render the children', () => {
    const { getByText } = render(
      <Panel>
        <div>TEST</div>
      </Panel>,
    )

    const children = getByText('TEST')

    expect(children).toBeInTheDocument()
  })
})
