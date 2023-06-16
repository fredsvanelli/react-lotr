import { memo } from 'react'

import { StyledContainer } from './styles'

interface IContainerProps {
  children?: React.ReactNode
  className?: string
  maxWidth?: number
}

const Container: React.FC<IContainerProps> = ({
  children,
  className,
  maxWidth,
}) => (
  <StyledContainer className={className} $maxWidth={maxWidth}>
    {children}
  </StyledContainer>
)

export default memo(Container)
