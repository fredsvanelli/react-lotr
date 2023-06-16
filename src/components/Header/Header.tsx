import { memo, useCallback, useState } from 'react'

import { IoMenu } from 'react-icons/io5'
import { Link } from 'react-router-dom'

import LogoImg from 'assets/logo.png'

import Config from 'Config'

import Container from 'components/Container/Container'
import Menu from 'components/Menu/Menu'

import {
  DrawerMenu,
  HeaderContainer,
  HeaderContent,
  Logo,
  MenuButton,
  Overlay,
} from './styles'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = useCallback(() => {
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <HeaderContainer>
        <Container>
          <HeaderContent>
            <div className="d-lg-none">
              <MenuButton type="button" onClick={() => setIsMenuOpen(true)}>
                <IoMenu />
              </MenuButton>
            </div>
            <Link to="/" title={Config.app.name}>
              <Logo src={LogoImg} alt={Config.app.name} />
            </Link>
            <div className="d-none d-lg-block">
              <Menu />
            </div>
          </HeaderContent>
        </Container>
      </HeaderContainer>
      <DrawerMenu className={`d-lg-none ${isMenuOpen ? 'show' : ''}`}>
        <h2 className="mb-3">Menu</h2>
        <Menu onClickOnItem={handleMenuClick} />
      </DrawerMenu>
      <Overlay
        className={`d-lg-none ${isMenuOpen ? 'show' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />
    </>
  )
}

export default memo(Header)
