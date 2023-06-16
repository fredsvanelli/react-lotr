import styled from 'styled-components'

export const MenuCardContainer = styled.div`
  position: relative;
  width: 100%;
  box-shadow: 0 0 3rem rgba(0, 0, 0, 0.5);
  border-bottom: solid 2px black;
  transition: all 0.3s ease-in-out;

  @media (min-width: 992px) {
    &:hover {
      z-index: 1;
      border-bottom: solid 2px gold;
      transform: scale(1.05);
    }
  }

  img {
    width: 100%;
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 100%;
  }
`
export const CardTitle = styled.h2`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 3rem 2rem 2rem;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  color: white;
  font-size: 2rem;
  font-weight: 300;
  text-align: center;
  text-transform: uppercase;

  @media (min-width: 1200px) {
    font-size: 2.5rem;
  }
`
