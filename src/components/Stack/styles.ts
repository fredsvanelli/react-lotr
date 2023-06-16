import styled from 'styled-components'

interface IStackContainerProps {
  $gap: 0 | 1 | 2 | 3 | 4 | 5
  $direction: 'row' | 'column'
}

export const StackContainer = styled.div<IStackContainerProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ $gap }) => $gap * 0.5}rem;
`
