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

const MoviesPage: React.FC = () => {
  const Movies = useMovie()
  const setTitle = useTitle()

  useEffect(() => {
    setTitle('Movies')
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
          <PageTitle title="Movies" backTo="/" />
          <LoadingGate isLoading={Movies.isLoading}>
            {Movies.data.length > 0 && (
              <Row cols={1} colsSm={2} colsMd={3} colsXl={4}>
                {Movies.data.map((movie) => (
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

export default memo(MoviesPage)
