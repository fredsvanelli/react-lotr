import { styled } from 'styled-components'

export const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 3rem;

  @media (min-width: 768px) {
    flex-direction: row;

    & > div {
      &:first-child {
        flex-basis: 33.333%;
      }

      &:last-child {
        display: flex;
        align-items: stretch;
        flex-basis: 66.666%;
      }
    }
  }

  @media (min-width: 1200px) {
    & > div {
      &:first-child {
        flex-basis: 25%;
      }

      &:last-child {
        flex-basis: 75%;
      }
    }
  }
`

export const QuotesContainer = styled.div`
  max-height: 70vh;
  overflow-y: scroll;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: #111;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #999;
  }
`

export const LoadMoreQuotesContainer = styled.div`
  text-align: center;
  margin-top: 2rem;

  button {
    padding: 1rem 2rem;
    border: 0;
    border-radius: 0.5rem;
    background-color: #222;
    color: white;
    font-size: 1.6rem;
    font-weight: 300;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #333;
    }
  }
`
