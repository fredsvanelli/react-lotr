import ReactPaginate from 'react-paginate'
import styled from 'styled-components'

export const PaginationContainer = styled.div<{ $isLoading?: boolean }>`
  opacity: ${({ $isLoading }) => ($isLoading ? 0.5 : 1)};
`

export const PageList = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 0;

  & > li {
    list-style: none;

    & > a {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 52px;
      height: 52px;
      text-decoration: none;
      font-size: 1.2rem;
      color: white;
      border: 2px solid gold;
      border-radius: 50%;
      cursor: pointer;
    }

    &.selected > a,
    & > a:hover {
      color: black;
      background-color: gold;
      border-color: gold;
    }
  }
`
