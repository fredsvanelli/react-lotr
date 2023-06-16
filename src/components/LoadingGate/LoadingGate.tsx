import { memo, ReactElement } from 'react'

import { EllipsisLoader } from 'components/Loaders'

interface ILoadingGateProps {
  isLoading?: boolean
  fallback?: ReactElement
  children: React.ReactNode
}

const LoadingGate: React.FC<ILoadingGateProps> = ({
  isLoading = false,
  fallback,
  children,
}) => (isLoading ? fallback ?? <EllipsisLoader /> : children) as ReactElement

export default memo(LoadingGate)
