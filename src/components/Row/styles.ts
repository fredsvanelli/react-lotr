import styled from 'styled-components'

interface IRowContainerProps {
  $cols: number
  $colsSm?: number
  $colsMd?: number
  $colsLg?: number
  $colsXl?: number
  $gap: number
}

export const RowContainer = styled.div<IRowContainerProps>`
  --gap: ${({ $gap }) => $gap}rem;
  display: flex;
  flex-wrap: wrap;
  margin: 0 calc(-0.5 * var(--gap));

  & > div {
    flex: 0 0 auto;
    display: flex;
    align-items: stretch;
    width: calc(100% / ${({ $cols }) => $cols});
    padding: 0 calc(0.5 * var(--gap));
    margin-bottom: var(--gap);

    ${({ $colsSm }) =>
      $colsSm &&
      `@media (min-width: 576px) { width: calc(100% / ${$colsSm}); }`}
    ${({ $colsMd }) =>
      $colsMd &&
      `@media (min-width: 768px) { width: calc(100% / ${$colsMd}); }`}
    ${({ $colsLg }) =>
      $colsLg &&
      `@media (min-width: 992px) { width: calc(100% / ${$colsLg}); }`}
    ${({ $colsXl }) =>
      $colsXl &&
      `@media (min-width: 1200px) { width: calc(100% / ${$colsXl}); }`}
  }
`
