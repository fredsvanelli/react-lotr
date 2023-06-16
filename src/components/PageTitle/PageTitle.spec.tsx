import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import PageTitle from './PageTitle'

const fakeTitle = faker.lorem.word()
const fakeRoute = `/${faker.lorem.slug()}`

const mockedBreadcrumbs = [
  {
    label: faker.lorem.word(),
    route: fakeRoute,
  },
]

const mockedNavigation = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const mod: object = await importOriginal()

  return {
    ...mod,
    useNavigate: () => mockedNavigation,
  }
})

describe('PageTitle', () => {
  it('should render the component with the correct info', () => {
    const { container, getByText } = render(<PageTitle title={fakeTitle} />, {
      wrapper: BrowserRouter,
    })

    const breadcrumbElement = container.querySelector('a')

    expect(breadcrumbElement).toHaveTextContent('Home')
    expect(breadcrumbElement).toHaveAttribute('href', '/')
    expect(getByText(fakeTitle)).toBeInTheDocument()
  })

  it('should render the component with the breadcrumbs', () => {
    const { container } = render(
      <PageTitle title={fakeTitle} breadcrumbs={mockedBreadcrumbs} />,
      {
        wrapper: BrowserRouter,
      },
    )

    const breadcrumbElement = container.querySelectorAll('a')

    expect(breadcrumbElement[0]).toHaveTextContent('Home')
    expect(breadcrumbElement[0]).toHaveAttribute('href', '/')
    expect(breadcrumbElement[1]).toHaveTextContent(mockedBreadcrumbs[0].label)
    expect(breadcrumbElement[1]).toHaveAttribute(
      'href',
      mockedBreadcrumbs[0].route,
    )
  })

  it('should render the component with the back button', () => {
    const { getByTitle } = render(
      <PageTitle title={fakeTitle} backTo={fakeRoute} />,
      {
        wrapper: BrowserRouter,
      },
    )

    expect(getByTitle('Back')).toHaveAttribute('href', fakeRoute)
  })
})
