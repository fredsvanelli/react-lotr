import { memo } from 'react'

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'

import Character from 'pages/Character'
import Characters from 'pages/Characters'
import Home from 'pages/Home'
import Movie from 'pages/Movie'
import Movies from 'pages/Movies'
import NotFound from 'pages/NotFound'
import Quotes from 'pages/Quotes'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:slug/:id" element={<Movie />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:slug/:id" element={<Character />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  )
}

export default memo(Routes)
