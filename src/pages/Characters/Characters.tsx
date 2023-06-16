import { memo, useCallback, useEffect, useState } from 'react'

import { useCharacter } from 'context/CharacterContext'

import CharacterCard from 'components/CharacterCard'
import Container from 'components/Container'
import Footer from 'components/Footer'
import Header from 'components/Header'
import LoadingGate from 'components/LoadingGate'
import Main from 'components/Main'
import PageTitle from 'components/PageTitle'
import Pagination from 'components/Pagination'
import Row from 'components/Row'
import Search from 'components/Search'
import Stack from 'components/Stack/Stack'

import { plural } from 'helpers'

import useTitle from 'hooks/useTitle'

const CharactersPage: React.FC = () => {
  const [search, setSearch] = useState<string | undefined>(undefined)
  const Characters = useCharacter()
  const setTitle = useTitle()

  useEffect(() => {
    setTitle('Characters')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    Characters.getAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = useCallback(
    (page: number) =>
      Characters.getAll({ page, search, loadingType: 'paginate' }),
    [Characters, search],
  )

  const handleSearch = useCallback(
    (s: string) => {
      setSearch(s)
      Characters.getAll({ search: s })
    },
    [Characters],
  )

  const handleClearSearch = useCallback(() => {
    setSearch(undefined)
    Characters.getAll()
  }, [Characters])

  return (
    <>
      <Header />
      <Main>
        <Container>
          <PageTitle title="Characters" backTo="/" />
          <div
            className="mb-3"
            style={{ display: 'flex', flexDirection: 'row-reverse' }}
          >
            <Search
              placeholder="Search for a character"
              showClearButton={!!search}
              isLoading={Characters.isSearching || Characters.isLoading}
              disabled={Characters.isSearching || Characters.isLoading}
              onSearch={handleSearch}
              onClear={handleClearSearch}
            />
          </div>
          <LoadingGate isLoading={Characters.isLoading}>
            {search && !Characters.data.length && (
              <div className="text-center">
                No results found for <strong>&quot;{search}&quot;</strong>
              </div>
            )}
            {Characters.data.length > 0 && (
              <>
                {search && !Characters.isSearching && (
                  <Stack className="mb-3" direction="column" gap={2}>
                    <div>
                      Showing {Characters.pagination?.total ?? 1}{' '}
                      {plural(
                        'result',
                        'results',
                        Characters.pagination?.total,
                      )}{' '}
                      for <strong>&quot;{search}&quot;</strong>
                    </div>
                    {(Characters.pagination?.pages ?? 1) > 1 && (
                      <p>
                        Page {Characters.pagination?.page} of{' '}
                        {Characters.pagination?.pages}
                      </p>
                    )}
                  </Stack>
                )}
                <Row cols={1} colsSm={2} colsMd={3} colsXl={4} gap={2}>
                  {Characters.data.map((character) => (
                    <div key={character._id}>
                      <CharacterCard character={character} />
                    </div>
                  ))}
                </Row>
                {(Characters.pagination?.pages ?? 1) > 0 && (
                  <Pagination
                    onPageChange={handlePageChange}
                    currentPage={Characters.pagination?.page}
                    totalPages={Characters.pagination?.pages}
                    isLoading={Characters.isPaginating}
                  />
                )}
              </>
            )}
          </LoadingGate>
        </Container>
      </Main>
      <Footer />
    </>
  )
}

export default memo(CharactersPage)
