import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { toast } from 'react-toastify'

import Api from 'services/Api'

import { CharacterType } from 'types/CharacterType'
import {
  GetEntityListGenericOptionsType,
  GetPaginatedResultReturnType,
  OrderDirectionType,
  PaginationType,
  RepositoryStoredPaginatedDataType,
} from 'types/GenericTypes'

import { useLifeCycleMemo } from './LifeCycleMemo'

interface ICharacterContextProps
  extends RepositoryStoredPaginatedDataType<CharacterType> {
  getAll: (options?: GetEntityListGenericOptionsType) => Promise<void>
  getById: (id: string) => Promise<void>
  isLoading: boolean
  isPaginating: boolean
  isSearching: boolean
  isSorting: boolean
  isSortedBy: string
  sortDirection: 'asc' | 'desc'
  current: { data: CharacterType | null; isLoading: boolean }
}

interface IProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<ICharacterContextProps>(
  {} as ICharacterContextProps,
)

export const CharacterProvider: React.FC<IProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const [pagination, setPagination] = useState<PaginationType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPaginating, setIsPaginating] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isSorting, setIsSorting] = useState(false)
  const [isSortedBy, setIsSortedBy] = useState('id')
  const [sortDirection, setSortDirection] = useState<OrderDirectionType>('desc')
  const [character, setCharacter] = useState<CharacterType | null>(null)
  const [isLoadingCurrent, setIsLoadingCurrent] = useState(false)

  const LifeCycleMemo = useLifeCycleMemo()

  const getCharacters = useCallback(
    async (options = {} as GetEntityListGenericOptionsType) => {
      const {
        search,
        page = 1,
        orderBy = 'name',
        order = 'asc',
        limit = 384,
        loadingType = 'full',
      } = options

      setIsSortedBy(orderBy)
      setSortDirection(order)

      switch (loadingType) {
        case 'paginate':
          setIsPaginating(true)
          break
        case 'search':
          setIsSearching(true)
          break
        case 'sort':
          setIsSorting(true)
          break
        default:
          setIsLoading(true)
      }

      const params = {
        name: search ? `/${search}/i` : undefined,
        page,
        sort: `${orderBy}:${order}`,
        limit,
      }

      const lifeCycleMemoKey = `characters:${JSON.stringify(params)}`

      const { data, pagination: paginationData } = await LifeCycleMemo.get<
        RepositoryStoredPaginatedDataType<CharacterType>
      >(lifeCycleMemoKey, async () => {
        try {
          const {
            data: {
              docs,
              total,
              limit: paginationLimit,
              offset,
              page: currentPage,
              pages,
            },
          } = await Api.get<GetPaginatedResultReturnType<CharacterType>>(
            '/character',
            {
              params,
            },
          )

          const paginatedData = {
            data: docs,
            pagination: {
              total,
              limit: paginationLimit,
              offset,
              page: currentPage,
              pages,
            },
          }

          LifeCycleMemo.set(lifeCycleMemoKey, paginatedData)

          return paginatedData
        } catch (_) {
          toast.error('Error while fetching characters data')

          return {
            data: [],
            pagination: null,
          }
        }
      })

      setCharacters(data)
      setPagination(paginationData)

      setIsLoading(false)
      setIsPaginating(false)
      setIsSearching(false)
      setIsSorting(false)
    },
    [LifeCycleMemo],
  )

  const getCharacter = useCallback(
    async (id: string) => {
      setIsLoadingCurrent(true)

      const lifeCycleMemoKey = `characters:${id}`

      const { data } = await LifeCycleMemo.get<
        RepositoryStoredPaginatedDataType<CharacterType>
      >(lifeCycleMemoKey, async () => {
        try {
          const {
            data: { docs },
          } = await Api.get<GetPaginatedResultReturnType<CharacterType>>(
            `/character/${id}`,
          )

          const paginatedData = {
            data: docs,
            pagination: null,
          }

          LifeCycleMemo.set(lifeCycleMemoKey, paginatedData)

          return paginatedData
        } catch (_) {
          toast.error('Error while fetching character data')

          return {
            data: [],
            pagination: null,
          }
        }
      })

      setCharacter(data?.[0] ?? null)
      setIsLoadingCurrent(false)
    },
    [LifeCycleMemo],
  )

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          getAll: getCharacters,
          getById: getCharacter,
          data: characters,
          pagination,
          isLoading,
          isPaginating,
          isSearching,
          isSorting,
          isSortedBy,
          sortDirection,
          current: { data: character, isLoading: isLoadingCurrent },
        }),
        [
          getCharacter,
          getCharacters,
          isLoading,
          isLoadingCurrent,
          isPaginating,
          isSearching,
          isSortedBy,
          isSorting,
          character,
          characters,
          pagination,
          sortDirection,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const useCharacter = (): ICharacterContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useCharacter must be within CharacterProvider')
  }

  return context
}
