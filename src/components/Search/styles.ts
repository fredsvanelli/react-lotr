import styled from 'styled-components'

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 2rem;
  padding: 0 1.5rem;
  gap: 0.5rem;

  @media (min-width: 768px) {
    max-width: 300px;
  }
`
export const SearchInput = styled.input`
  flex-grow: 1;
  color: black;
  padding: 0.9rem 0;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  color: black;
  background-color: transparent;
`
