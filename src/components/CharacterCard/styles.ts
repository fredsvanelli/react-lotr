import styled from 'styled-components'

export const CharacterCardContainer = styled.div`
  position: relative;
  width: 100%;
  box-shadow: 0 0 3rem rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0.5rem;

  &:hover {
    transform: scale(1.05);
  }

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
  padding: 2rem;
`

export const CardTitle = styled.h2`
  font-size: 2rem;
  font-weight: 300;
`

export const CardRace = styled.h2`
  font-size: 1.6rem;
  font-weight: 300;
  color: gray;
`
