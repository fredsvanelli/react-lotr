import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { QuoteType } from 'types/MovieType'

import QuoteCard from './QuoteCard'

const MOCKED_QUOTE: QuoteType = {
  _id: 'mocked ID',
  dialog: 'My precious!',
  character: 'mocked character ID',
}

describe('QuoteCard', () => {
  it('should render the quote info', () => {
    const { getByText, getByTestId } = render(
      <QuoteCard quote={MOCKED_QUOTE} author="Smeagol" />,
    )

    const quote = getByText('My precious!')
    const author = getByTestId('quote-card-author')

    expect(quote).toBeInTheDocument()
    expect(author).toHaveTextContent('Smeagol')
  })

  it('should not render the quote author if is not defined', () => {
    const { getByText, queryByTestId } = render(
      <QuoteCard quote={MOCKED_QUOTE} />,
    )

    const quote = getByText('My precious!')
    const author = queryByTestId('quote-card-author')

    expect(quote).toBeInTheDocument()
    expect(author).not.toBeInTheDocument()
  })
})
