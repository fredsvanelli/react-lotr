import { memo } from 'react'

import { RiMovieFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import slugify from 'react-slugify'

import RTLogo from 'assets/rt-logo.png'

import Stack from 'components/Stack'

import { getMovieCover } from 'helpers'

import { MovieType } from 'types/MovieType'

import {
  CardBody,
  CardCover,
  CardTitle,
  MovieCardContainer,
  MovieInfo,
} from './styles'

interface IMovieCardProps {
  movie: MovieType
  clickable?: boolean
}

const MovieCard: React.FC<IMovieCardProps> = ({ movie, clickable = false }) => (
  <MovieCardContainer $clickable={clickable} data-testid="movie-card">
    <CardCover src={getMovieCover(movie._id)} alt={movie.name} />
    <CardBody>
      <CardTitle>{movie.name}</CardTitle>
      <Stack style={{ justifyContent: 'space-between', marginTop: 'auto' }}>
        {movie.runtimeInMinutes && (
          <MovieInfo>
            <RiMovieFill size={20} />
            {movie.runtimeInMinutes} minutes
          </MovieInfo>
        )}
        {movie.rottenTomatoesScore && (
          <MovieInfo>
            <img
              src={RTLogo}
              alt="Rotten Tomatoes"
              width={16}
              title="Rotten Tomatoes score"
            />
            {movie.rottenTomatoesScore.toFixed(0)}%
          </MovieInfo>
        )}
      </Stack>
      {clickable && (
        <Link
          to={`/movies/${slugify(movie.name)}/${movie._id}`}
          title={movie.name}
          state={{ movie }}
        />
      )}
    </CardBody>
  </MovieCardContainer>
)

export default memo(MovieCard)
