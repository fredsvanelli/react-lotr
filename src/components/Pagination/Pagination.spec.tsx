import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Pagination from './Pagination'

const mockedOnPageChange = vi.fn()

describe('Pagination', () => {
  it('should render the component with the correct total pages and current page', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={5} />)

    const pageList = container.querySelectorAll('li')

    expect(pageList).toHaveLength(7)
    expect(pageList[1]).toHaveClass('selected')
  })

  it('should call the correct page when the pagination is clicked', async () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockedOnPageChange}
      />,
    )

    const pageButton = getByText('4')
    expect(pageButton.parentElement).not.toHaveClass('selected')

    await userEvent.click(pageButton)

    expect(mockedOnPageChange).toHaveBeenCalledWith(4)
    expect(pageButton.parentElement).toHaveClass('selected')
  })

  it('should not render the previous button when the current page is the first', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={5} />)

    expect(container.querySelectorAll('li')[0]).toHaveClass('disabled')
  })

  it('should not render the pagination when totalPages is 1', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} />)

    expect(container.querySelector('ul')).not.toBeInTheDocument()
  })
})
