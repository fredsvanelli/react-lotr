import { memo } from 'react'

import { Link } from 'react-router-dom'

import LogoImg from 'assets/logo.png'

import Config from 'Config'

import Container from 'components/Container'

import { HeaderContainer, Logo } from './styles'

const Header: React.FC = () => (
  <HeaderContainer>
    <Container className="text-center">
      <Link to="/" title={Config.app.name}>
        <Logo src={LogoImg} alt={Config.app.name} />
      </Link>
    </Container>
  </HeaderContainer>
)

export default memo(Header)
