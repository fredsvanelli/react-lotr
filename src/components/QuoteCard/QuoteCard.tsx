import { memo } from 'react'

import { QuoteType } from 'types/MovieType'

import {
  CardBody,
  CardTitle,
  QuoteCardContainer,
  QuoteCharacter,
} from './styles'

interface IQuoteCardProps {
  quote: QuoteType
  author?: string | null
}

const QuoteCard: React.FC<IQuoteCardProps> = ({ quote, author }) => (
  <QuoteCardContainer>
    <CardBody>
      <CardTitle>{quote.dialog}</CardTitle>
      {author && (
        <QuoteCharacter data-testid="quote-card-author">
          - {author}
        </QuoteCharacter>
      )}
    </CardBody>
  </QuoteCardContainer>
)

export default memo(QuoteCard)
