import { memo } from 'react'

import { MainContainer } from './styles'

interface IMainProps {
  children: React.ReactNode
  background?: string
}

const Main: React.FC<IMainProps> = ({ children, background }) => (
  <MainContainer $background={background}>{children}</MainContainer>
)

export default memo(Main)
