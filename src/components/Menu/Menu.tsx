import { memo } from 'react'

import Config from 'Config'

import { MenuContainer, MenuItem } from './styles'

interface IMenuProps {
  onClickOnItem?: () => void
}

const Menu: React.FC<IMenuProps> = ({ onClickOnItem }) => (
  <MenuContainer>
    <MenuItem to="/" title={Config.app.name} onClick={onClickOnItem}>
      Home
    </MenuItem>
    <MenuItem to="/movies" title="Movies" onClick={onClickOnItem}>
      Movies
    </MenuItem>
    <MenuItem to="/characters" title="Characters" onClick={onClickOnItem}>
      Characters
    </MenuItem>
    <MenuItem to="/quotes" title="Quotes" onClick={onClickOnItem}>
      Quotes
    </MenuItem>
  </MenuContainer>
)

export default memo(Menu)
