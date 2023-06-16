import { memo, useEffect } from 'react'

import CharactersCover from 'assets/characters-cover.jpg'
import MoviesCover from 'assets/movies-cover.jpg'
import QuotesCover from 'assets/quotes-cover.jpg'

import Container from 'components/Container'
import Footer from 'components/Footer'
import HomeHeader from 'components/HomeHeader'
import Main from 'components/Main'
import MenuCard from 'components/MenuCard'
import Row from 'components/Row'

import useTitle from 'hooks/useTitle'

const Home: React.FC = () => {
  const setTitle = useTitle()

  useEffect(() => {
    setTitle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <HomeHeader />
      <Main>
        <Container maxWidth={960}>
          <Row cols={1} colsMd={3} gap={2}>
            <div>
              <MenuCard
                title="Movies"
                route="/movies"
                background={MoviesCover}
              />
            </div>
            <div>
              <MenuCard
                title="Characters"
                route="/characters"
                background={CharactersCover}
              />
            </div>
            <div>
              <MenuCard
                title="Quotes"
                route="/quotes"
                background={QuotesCover}
              />
            </div>
          </Row>
        </Container>
      </Main>
      <Footer />
    </>
  )
}

export default memo(Home)
