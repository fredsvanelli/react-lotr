import { CSSProperties, memo } from 'react'

import { StackContainer } from './styles'

interface IStackProps {
  gap?: 0 | 1 | 2 | 3 | 4 | 5
  direction?: 'row' | 'column'
  children: React.ReactNode
  style?: CSSProperties
  className?: string
}

const Stack: React.FC<IStackProps> = ({
  gap = 3,
  direction = 'row',
  children,
  style,
  className,
}) => (
  <StackContainer
    style={style}
    className={className}
    $gap={gap}
    $direction={direction}
  >
    {children}
  </StackContainer>
)

export default memo(Stack)
