import { memo } from 'react'

import Stack from 'components/Stack/Stack'

import Routes from 'Routes'

const App: React.FC = () => (
  <Stack direction="column" gap={0} style={{ minHeight: '100vh' }}>
    <Routes />
  </Stack>
)

export default memo(App)
