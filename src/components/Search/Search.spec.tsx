import { faker } from '@faker-js/faker'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Search from './Search'

const mockedOnSearch = vi.fn()
const mockedOnClear = vi.fn()

const fakeSearch = faker.lorem.word()
const fakePlaceholder = faker.lorem.word()

describe('Search', () => {
  it('should render the component', () => {
    const { getByPlaceholderText, container } = render(
      <Search onSearch={mockedOnSearch} />,
    )

    expect(getByPlaceholderText('Search')).toBeInTheDocument()
    expect(container.querySelector('button')).toBeDisabled()
  })

  it('should render the component with a custom placeholder', () => {
    const { getByPlaceholderText } = render(
      <Search placeholder={fakePlaceholder} onSearch={mockedOnSearch} />,
    )

    expect(getByPlaceholderText(fakePlaceholder)).toBeInTheDocument()
  })

  it('should call the onSearch function when clicking on the search button', async () => {
    const { getByPlaceholderText, container } = render(
      <Search onSearch={(search) => mockedOnSearch(search)} />,
    )

    const buttonElement = container.querySelector('button')
    expect(buttonElement).toBeDisabled()

    fireEvent.input(getByPlaceholderText('Search'), {
      target: { value: fakeSearch },
    })

    expect(buttonElement).not.toBeDisabled()

    if (buttonElement) {
      await userEvent.click(buttonElement)
    }

    expect(mockedOnSearch).toHaveBeenCalledWith(fakeSearch)
  })

  it('should call the onSearch function when pressing [Enter/Return] on the keyboard', async () => {
    const { getByPlaceholderText } = render(
      <Search onSearch={mockedOnSearch} />,
    )

    const inputElement = getByPlaceholderText('Search')

    fireEvent.input(inputElement, {
      target: { value: fakeSearch },
    })

    await userEvent.type(inputElement, '{Enter}')
    expect(mockedOnSearch).toHaveBeenCalledWith(fakeSearch)
  })

  it('should render the component with a "clear" button', async () => {
    const { getByPlaceholderText, container } = render(
      <Search
        onSearch={mockedOnSearch}
        showClearButton
        onClear={mockedOnClear}
      />,
    )

    const buttonElements = container.querySelectorAll('button')
    const inputElement = getByPlaceholderText('Search')

    expect(buttonElements).toHaveLength(2)

    fireEvent.input(inputElement, {
      target: { value: fakeSearch },
    })

    expect(inputElement).toHaveValue(fakeSearch)

    await userEvent.click(buttonElements[0])

    expect(inputElement).toHaveValue('')
  })

  it('should hide the buttons when isLoading is true', () => {
    const { container } = render(<Search isLoading onSearch={mockedOnSearch} />)

    const buttonElements = container.querySelectorAll('button')

    expect(buttonElements).toHaveLength(0)
  })
})
