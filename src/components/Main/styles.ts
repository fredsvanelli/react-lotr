import styled from 'styled-components'

interface IMainContainerProps {
  $background?: string
}

export const MainContainer = styled.main<IMainContainerProps>`
  position: relative;
  flex: 1;

  ${({ $background }) =>
    $background &&
    `
    background-image: url(${$background});
    background-size: cover;
    background-position: center center;
  `}
`
