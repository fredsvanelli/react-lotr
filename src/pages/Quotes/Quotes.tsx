import { memo, useEffect } from 'react'

import { useMovie } from 'context/MovieContext'

import Container from 'components/Container'
import Footer from 'components/Footer'
import Header from 'components/Header'
import LoadingGate from 'components/LoadingGate'
import Main from 'components/Main'
import MovieCard from 'components/MovieCard'
import PageTitle from 'components/PageTitle'
import Row from 'components/Row'

import useTitle from 'hooks/useTitle'

// Only the main trilogy movies have quotes
const MOVIES_WITH_QUOTES = [
  '5cd95395de30eff6ebccde5b',
  '5cd95395de30eff6ebccde5c',
  '5cd95395de30eff6ebccde5d',
]

const QuotesPage: React.FC = () => {
  const Movies = useMovie()
  const setTitle = useTitle()

  useEffect(() => {
    setTitle('Quotes')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    Movies.getAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <Main>
        <Container>
          <PageTitle title="Quotes" backTo="/" />
          <p className="mb-3">Choose a movie to see its famous quotes.</p>
          <LoadingGate isLoading={Movies.isLoading}>
            {Movies.data.length > 0 && (
              <Row cols={1} colsSm={2} colsMd={3} colsXl={4}>
                {Movies.data
                  .filter((movie) => MOVIES_WITH_QUOTES.includes(movie._id))
                  .map((movie) => (
                    <div key={movie._id}>
                      <MovieCard movie={movie} clickable />
                    </div>
                  ))}
              </Row>
            )}
          </LoadingGate>
        </Container>
      </Main>
      <Footer />
    </>
  )
}

export default memo(QuotesPage)
