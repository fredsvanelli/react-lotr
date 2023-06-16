import { memo } from 'react'

import { Link } from 'react-router-dom'
import slugify from 'react-slugify'

import { CharacterType } from 'types/CharacterType'

import { CardBody, CardRace, CardTitle, CharacterCardContainer } from './styles'

interface ICharacterCardProps {
  character: CharacterType
}

const CharacterCard: React.FC<ICharacterCardProps> = ({ character }) => (
  <CharacterCardContainer data-testid="character-card">
    <CardBody>
      <CardTitle>{character.name}</CardTitle>
      {character.race && character.race !== 'NaN' && (
        <CardRace>{character.race}</CardRace>
      )}
      <Link
        to={`/characters/${slugify(character.name)}/${character._id}`}
        title={character.name}
        state={{ character }}
      />
    </CardBody>
  </CharacterCardContainer>
)

export default memo(CharacterCard)
