import styled from 'styled-components'

interface IMovieCardContainerProps {
  $clickable: boolean
}

export const MovieCardContainer = styled.div<IMovieCardContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  box-shadow: 0 0 3rem rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0.5rem;

  ${({ $clickable }) =>
    $clickable &&
    `
    @media(min-width: 992px) {
      transition: all 0.3s ease-in-out;
      &:hover {
        transform: scale(1.05);
      }
    }
  `}

  a {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`
export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 2rem;
`

export const CardTitle = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 2rem;
`

export const CardCover = styled.img`
  width: 100%;
  height: auto;
  border-bottom: 0.2rem solid gold;
  border-radius: 0.5rem 0.5rem 0 0;
`
export const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  color: gray;
`
