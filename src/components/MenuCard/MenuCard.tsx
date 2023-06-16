import { memo } from 'react'

import { Link } from 'react-router-dom'

import { CardTitle, MenuCardContainer } from './styles'

interface IMenuCardProps {
  title: string
  route: string
  background: string
}

const MenuCard: React.FC<IMenuCardProps> = ({ title, route, background }) => (
  <MenuCardContainer>
    <img src={background} alt={title} />
    <CardTitle>{title}</CardTitle>
    <Link to={route} title={title} />
  </MenuCardContainer>
)

export default memo(MenuCard)
