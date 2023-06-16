import { memo, useCallback, useEffect, useMemo } from 'react'

import { Location, useLocation, useParams } from 'react-router-dom'

import { useMovie } from 'context/MovieContext'

import Container from 'components/Container'
import Footer from 'components/Footer'
import Header from 'components/Header'
import LoadingGate from 'components/LoadingGate'
import Main from 'components/Main'
import MovieCard from 'components/MovieCard'
import PageTitle from 'components/PageTitle'
import Panel from 'components/Panel/Panel'
import QuoteCard from 'components/QuoteCard'
import Stack from 'components/Stack/Stack'

import { formatMoney } from 'helpers'

import useTitle from 'hooks/useTitle'

import { MovieType } from 'types/MovieType'

import {
  LoadMoreQuotesContainer,
  MovieContainer,
  QuotesContainer,
} from './styles'

type MovieLocationStateType = Location & {
  movie?: MovieType
}

type MovieURLParamsType = {
  id: string
}

const Movie: React.FC = () => {
  const Movies = useMovie()
  const { state } = useLocation() as MovieLocationStateType
  const { id } = useParams() as MovieURLParamsType
  const setTitle = useTitle()

  const movie: MovieType | null = useMemo(
    () => state?.movie ?? Movies.current.data,
    [Movies, state?.movie],
  )

  useEffect(() => {
    setTitle([movie?.name ?? 'Loading...', 'Movies'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie?.name])

  useEffect(() => {
    if (!movie) {
      Movies.getById(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (movie?._id) {
      Movies.current.getQuotes(movie._id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie?._id])

  const handleLoadMoreQuotes = useCallback(() => {
    if (movie?._id) {
      Movies.current.getQuotes(movie._id, {
        page: (Movies.current.quotes.pagination?.page ?? 0) + 1,
      })
    }
  }, [Movies, movie])

  return (
    <>
      <Header />
      <Main>
        <Container>
          <PageTitle
            title={movie?.name ?? 'Loading...'}
            backTo="/movies"
            breadcrumbs={[{ label: 'Movies', route: '/movies' }]}
          />
          <LoadingGate isLoading={Movies.current.isLoading}>
            {movie && (
              <MovieContainer>
                <div>
                  <MovieCard movie={movie} />
                </div>
                <div>
                  <Panel>
                    <Stack direction="column" gap={5}>
                      <div>
                        <h2>Academy Awards</h2>
                        <p>Nominations: {movie.academyAwardNominations}</p>
                        <p>Wins: {movie.academyAwardWins}</p>
                      </div>
                      <div>
                        <h2>Financial Performance</h2>

                        {movie.budgetInMillions && (
                          <p>Budget: {formatMoney(movie.budgetInMillions)}</p>
                        )}
                        {movie.boxOfficeRevenueInMillions && (
                          <p>
                            Revenue:{' '}
                            {formatMoney(movie.boxOfficeRevenueInMillions)}
                          </p>
                        )}
                      </div>
                      <LoadingGate
                        isLoading={Movies.current.quotes.isLoading}
                        fallback={<h2>Loading quotes...</h2>}
                      >
                        {Movies.current.quotes.data.length > 0 && (
                          <div>
                            <h2 className="mb-3">Famous Quotes</h2>
                            <QuotesContainer>
                              <Stack direction="column" gap={2}>
                                {Movies.current.quotes.data.map((quote) => (
                                  <QuoteCard
                                    key={quote._id}
                                    quote={quote}
                                    author={Movies.current.quotes.getCharacterName(
                                      quote.character,
                                    )}
                                  />
                                ))}
                              </Stack>
                              {Movies.current.quotes.pagination?.isLastPage ===
                                false && (
                                <LoadMoreQuotesContainer className="text-center">
                                  <button
                                    type="button"
                                    onClick={handleLoadMoreQuotes}
                                    disabled={
                                      Movies.current.quotes.isLoadingMore
                                    }
                                  >
                                    {Movies.current.quotes.isLoadingMore
                                      ? 'Loading...'
                                      : 'Load more'}
                                  </button>
                                </LoadMoreQuotesContainer>
                              )}
                            </QuotesContainer>
                          </div>
                        )}
                      </LoadingGate>
                    </Stack>
                  </Panel>
                </div>
              </MovieContainer>
            )}
          </LoadingGate>
        </Container>
      </Main>
      <Footer />
    </>
  )
}

export default memo(Movie)
