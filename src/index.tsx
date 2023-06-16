import React from 'react'

import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

import { CharacterProvider } from 'context/CharacterContext'
import { LifeCycleMemoProvider } from 'context/LifeCycleMemo'
import { MovieProvider } from 'context/MovieContext'

import EnvironmentGate from 'components/EnvironmentGate/EnvironmentGate'

import { GlobalStyles } from 'styles/GlobalStyles'

import App from './App'

import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <EnvironmentGate>
      <LifeCycleMemoProvider>
        <MovieProvider>
          <CharacterProvider>
            <App />
          </CharacterProvider>
        </MovieProvider>
      </LifeCycleMemoProvider>
    </EnvironmentGate>
    <ToastContainer position="top-center" draggable={false} theme="colored" />
    <GlobalStyles />
  </React.StrictMode>,
)
