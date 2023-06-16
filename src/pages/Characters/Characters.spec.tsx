import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { expect, describe, it, vi } from 'vitest'

import { CharacterProvider } from 'context/CharacterContext'
import { LifeCycleMemoProvider } from 'context/LifeCycleMemo'

import Characters from './Characters'

const mocks = vi.hoisted(() => ({
  mockedUseCharacter: () => ({
    getAll: vi.fn(),
    data: [
      {
        _id: 'Fake ID 1',
        race: 'Hobbit',
        name: 'Frodo Baggins',
      },
      {
        _id: 'Fake ID 2',
        race: 'Hobbit',
        name: 'Samwise Gamgee',
      },
    ],
    pagination: null,
    isLoading: false,
  }),
}))

vi.mock('context/CharacterContext', async (importOriginal) => {
  const mod: object = await importOriginal()

  return {
    ...mod,
    useCharacter: mocks.mockedUseCharacter,
  }
})

describe('Characters', () => {
  it('should render the character list', () => {
    const { queryAllByTestId } = render(
      <LifeCycleMemoProvider>
        <CharacterProvider>
          <BrowserRouter>
            <Characters />
          </BrowserRouter>
        </CharacterProvider>
      </LifeCycleMemoProvider>,
    )

    const movieCards = queryAllByTestId('character-card')

    expect(movieCards).toHaveLength(2)
  })
})
