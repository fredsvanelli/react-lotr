import { memo } from 'react'

import { PanelContainer } from './styles'

interface IPanelProps {
  children?: React.ReactNode
}

const Panel: React.FC<IPanelProps> = ({ children }) => (
  <PanelContainer>{children}</PanelContainer>
)

export default memo(Panel)
