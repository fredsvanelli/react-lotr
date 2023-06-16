import { useCallback, useMemo } from 'react'

import Config from 'Config'

type UseTitleType = () => (title?: string | string[] | undefined) => void

const useTitle: UseTitleType = () => {
  const setTitle = useCallback((title?: string | string[]) => {
    const appName = Config.app.name ?? `My React App v${Config.app.version}`
    const titleArray = Array.isArray(title) ? title : [title]
    titleArray.push(appName)

    document.title = titleArray.filter((item) => item).join(' | ')
  }, [])

  return useMemo(() => setTitle, [setTitle])
}

export default useTitle
