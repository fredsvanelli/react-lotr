import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { expect, describe, it, vi } from 'vitest'

import { LifeCycleMemoProvider } from 'context/LifeCycleMemo'
import { MovieProvider } from 'context/MovieContext'

import Movies from './Movies'

const mocks = vi.hoisted(() => ({
  mockedUseMovie: () => ({
    getAll: vi.fn(),
    data: [
      {
        _id: '5cd95395de30eff6ebccde5c',
        name: 'The Fellowship of the Ring',
        runtimeInMinutes: 178,
        rottenTomatoesScore: 91,
      },
      {
        _id: '5cd95395de30eff6ebccde5b',
        name: 'The Two Towers',
        runtimeInMinutes: 179,
        rottenTomatoesScore: 96,
      },
      {
        _id: '5cd95395de30eff6ebccde5d',
        name: 'The Return of the King',
        runtimeInMinutes: 201,
        rottenTomatoesScore: 95,
      },
    ],
    pagination: null,
    isLoading: false,
  }),
}))

vi.mock('context/MovieContext', async (importOriginal) => {
  const mod: object = await importOriginal()

  return {
    ...mod,
    useMovie: mocks.mockedUseMovie,
  }
})

describe('Movies', () => {
  it('should render the movie list', () => {
    const { queryAllByTestId } = render(
      <LifeCycleMemoProvider>
        <MovieProvider>
          <BrowserRouter>
            <Movies />
          </BrowserRouter>
        </MovieProvider>
      </LifeCycleMemoProvider>,
    )

    const movieCards = queryAllByTestId('movie-card')

    expect(movieCards).toHaveLength(3)
  })
})
