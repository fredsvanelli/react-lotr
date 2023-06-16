import { memo, ReactElement, useMemo } from 'react'

import Config from 'Config'

import Container from 'components/Container'

import { EnvironmentGateContainer } from './styles'

interface IEnvironmentGateProps {
  children: React.ReactNode
}

const EnvironmentGate: React.FC<IEnvironmentGateProps> = ({ children }) => {
  const envErrors = useMemo(() => {
    const errors = []

    if (!Config.api.baseUrl) {
      errors.push('VITE_LOTR_API_URL')
    }

    if (!Config.api.token) {
      errors.push('VITE_LOTR_API_ACCESS_TOKEN')
    }

    return errors
  }, [])

  if (envErrors.length) {
    return (
      <Container>
        <EnvironmentGateContainer>
          <h1>Configure your environment</h1>
          <p>
            The following variables are not defined on the <code>.env</code>{' '}
            file
          </p>
          <div>
            {envErrors.map((error) => (
              <div key={error}>- {error}</div>
            ))}
          </div>
        </EnvironmentGateContainer>
      </Container>
    )
  }

  return children as ReactElement
}

export default memo(EnvironmentGate)
