/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { memo } from 'react'

import { PageList, PaginationContainer } from './styles'

interface PaginationProps {
  currentPage?: number
  totalPages?: number
  isLoading?: boolean
  dataTestid?: string
  onPageChange?: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 1,
  isLoading = false,
  dataTestid,
  onPageChange,
}) =>
  totalPages > 1 ? (
    <PaginationContainer $isLoading={isLoading} data-testid={dataTestid}>
      <PageList
        forcePage={currentPage - 1}
        onPageChange={({ selected }) => onPageChange?.(selected + 1)}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        nextLabel=">"
        previousLabel="<"
        previousClassName={currentPage === 1 ? 'd-none' : ''}
        nextClassName={currentPage === totalPages ? 'd-none' : ''}
      />
    </PaginationContainer>
  ) : null

export default memo(Pagination)
