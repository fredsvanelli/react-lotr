import { memo } from 'react'

import { RowContainer } from './styles'

interface IRowProps {
  cols?: number
  colsSm?: number
  colsMd?: number
  colsLg?: number
  colsXl?: number
  gap?: 0 | 1 | 2 | 3 | 4 | 5
  children?: React.ReactNode
}

const Row: React.FC<IRowProps> = ({
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  gap = 3,
  children,
}) => (
  <RowContainer
    $cols={cols}
    $colsSm={colsSm}
    $colsMd={colsMd}
    $colsLg={colsLg}
    $colsXl={colsXl}
    $gap={gap}
  >
    {children}
  </RowContainer>
)

export default memo(Row)
