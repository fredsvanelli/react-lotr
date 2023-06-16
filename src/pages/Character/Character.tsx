import { memo, useEffect, useMemo } from 'react'

import { FiExternalLink } from 'react-icons/fi'
import { Location, useLocation, useParams } from 'react-router-dom'

import { useCharacter } from 'context/CharacterContext'

import Container from 'components/Container'
import Footer from 'components/Footer'
import Header from 'components/Header'
import LoadingGate from 'components/LoadingGate'
import Main from 'components/Main'
import PageTitle from 'components/PageTitle'
import Panel from 'components/Panel/Panel'
import Stack from 'components/Stack/Stack'

import useTitle from 'hooks/useTitle'

import { CharacterType } from 'types/CharacterType'

type CharacterLocationStateType = Location & {
  character?: CharacterType
}

type CharacterURLParamsType = {
  id: string
}

const Character: React.FC = () => {
  const Characters = useCharacter()
  const { state } = useLocation() as CharacterLocationStateType
  const { id } = useParams() as CharacterURLParamsType
  const setTitle = useTitle()

  const character: CharacterType | null = useMemo(
    () => state?.character ?? Characters.current.data,
    [Characters, state?.character],
  )

  useEffect(() => {
    setTitle([character?.name ?? 'Loading...', 'Characters'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character?.name])

  useEffect(() => {
    if (!character) {
      Characters.getById(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <Main>
        <Container>
          <PageTitle
            title={character?.name ?? 'Loading...'}
            backTo="/characters"
            breadcrumbs={[{ label: 'Characters', route: '/characters' }]}
          />
          <LoadingGate isLoading={Characters.current.isLoading}>
            {character && (
              <div>
                <Panel>
                  <Stack direction="column" gap={5}>
                    {character.race && (
                      <div>
                        <h2>Race</h2>
                        <p>{character.race}</p>
                      </div>
                    )}
                    {character.gender && (
                      <div>
                        <h2>Gender</h2>
                        <p>{character.gender}</p>
                      </div>
                    )}
                    {character.realm && (
                      <div>
                        <h2>Realm</h2>
                        <p>{character.realm}</p>
                      </div>
                    )}
                    {character.birth && (
                      <div>
                        <h2>Birth</h2>
                        <p>{character.birth}</p>
                      </div>
                    )}
                    {character.death && (
                      <div>
                        <h2>Death</h2>
                        <p>{character.death}</p>
                      </div>
                    )}
                    {character.hair && (
                      <div>
                        <h2>Hair</h2>
                        <p>{character.hair}</p>
                      </div>
                    )}
                    {character.height && (
                      <div>
                        <h2>Height</h2>
                        <p>{character.height}</p>
                      </div>
                    )}
                    {character.spouse && (
                      <div>
                        <h2>Spouse</h2>
                        <p>{character.spouse}</p>
                      </div>
                    )}
                    {character.wikiUrl && (
                      <div>
                        <a
                          href={character.wikiUrl}
                          title="Learn more"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Learn more about {character.name}{' '}
                          <FiExternalLink className="ms-1" />
                        </a>
                      </div>
                    )}
                  </Stack>
                </Panel>
              </div>
            )}
          </LoadingGate>
        </Container>
      </Main>
      <Footer />
    </>
  )
}

export default memo(Character)
