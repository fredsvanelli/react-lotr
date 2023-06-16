import styled from 'styled-components'

export const HeaderContainer = styled.header`
  padding: 3rem 0;
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (min-width: 768px) {
    gap: 5rem;
  }
`

export const Logo = styled.img`
  width: 25rem;
  max-width: 100%;
`
export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  font-size: 4rem;
  color: white;
  cursor: pointer;
`

export const DrawerMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80%;
  max-width: 30rem;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 3rem;
  transform: translateX(-100%);
  transition: all 0.3s ease-in-out;
  z-index: 2;

  &.show {
    transform: translateX(0);
  }
`

export const Overlay = styled.button`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  z-index: 1;
  backdrop-filter: blur(2px);
  transition: all 0.3s ease-in-out;

  &.show {
    display: block;
  }
`
