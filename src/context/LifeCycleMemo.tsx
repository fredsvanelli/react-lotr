import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type GetFunctionType = <T>(key: string, defaultData: () => T | Promise<T>) => T

interface IContextProps {
  get: GetFunctionType
  set: (key: string, data: unknown) => void
  clear: () => void
}

interface ILifeCycleMemoProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IContextProps>({} as IContextProps)

export const LifeCycleMemoProvider: React.FC<ILifeCycleMemoProps> = ({
  children,
}) => {
  const [data, setData] = useState<Record<string, unknown> | null>(null)

  const get: GetFunctionType = useCallback(
    (key, defaultData) => (data?.[key] as never) || defaultData(),
    [data],
  )
  const set = useCallback((key: string, value: unknown) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const clear = useCallback(() => setData({}), [])

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          get,
          set,
          clear,
        }),
        [get, set, clear],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const useLifeCycleMemo = (): IContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useLifeCycleMemo must be within LifeCycleMemoProvider')
  }

  return context
}
