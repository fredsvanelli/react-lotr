import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  @media (min-width: 992px) {
    flex-direction: row;
    gap: 5rem;
  }
`

export const MenuItem = styled(Link)`
  font-size: 2rem;
  text-decoration: none;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`
