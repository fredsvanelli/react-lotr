import styled from 'styled-components'

interface IStyledContainerProps {
  $maxWidth?: number
}

export const StyledContainer = styled.div<IStyledContainerProps>`
  width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;

  @media (min-width: 576px) {
    max-width: ${({ $maxWidth }) => $maxWidth || 540}px;
  }

  @media (min-width: 768px) {
    max-width: ${({ $maxWidth }) => $maxWidth || 720}px;
  }

  @media (min-width: 992px) {
    max-width: ${({ $maxWidth }) => $maxWidth || 960}px;
  }

  @media (min-width: 1200px) {
    max-width: ${({ $maxWidth }) => $maxWidth || 1140}px;
  }
`
