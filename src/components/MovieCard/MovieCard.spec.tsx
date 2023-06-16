import { render } from '@testing-library/react'
import { expect, describe, it } from 'vitest'

import { MovieType } from 'types/MovieType'

import MovieCard from './MovieCard'

const MOCKED_MOVIE: MovieType = {
  _id: '5cd95395de30eff6ebccde5c',
  name: 'The Fellowship of the Ring',
  rottenTomatoesScore: 91,
  runtimeInMinutes: 178,
}

describe('MovieCard', () => {
  it('should render the movie info', () => {
    const { getByText } = render(<MovieCard movie={MOCKED_MOVIE} />)

    const title = getByText('The Fellowship of the Ring')
    const runtime = getByText('178 minutes')
    const rottenTomatoesScore = getByText('91%')

    expect(title).toBeInTheDocument()
    expect(runtime).toBeInTheDocument()
    expect(rottenTomatoesScore).toBeInTheDocument()
  })
})
