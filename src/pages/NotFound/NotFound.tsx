import { memo } from 'react'

import { Link } from 'react-router-dom'

import NotFoundBg from 'assets/not-found-bg.jpg'

import Container from 'components/Container'
import Main from 'components/Main'

import { NotFoundContent } from './styles'

const NotFound: React.FC = () => (
  <Main background={NotFoundBg}>
    <Container>
      <NotFoundContent>
        <p>
          <em>&quot;Not all those who wander are lost&quot;</em> - J. R. R.
          Tolkien
        </p>
        <p>
          Let&apos;s go{' '}
          <Link to="/" title="Take me home">
            home
          </Link>
        </p>
      </NotFoundContent>
    </Container>
  </Main>
)

export default memo(NotFound)
