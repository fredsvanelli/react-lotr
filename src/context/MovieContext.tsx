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
import { MovieType, QuoteType } from 'types/MovieType'

import { useLifeCycleMemo } from './LifeCycleMemo'

interface IMovieContextProps
  extends RepositoryStoredPaginatedDataType<MovieType> {
  getAll: (options?: GetEntityListGenericOptionsType) => Promise<void>
  getById: (id: string) => Promise<void>
  isLoading: boolean
  isPaginating: boolean
  isSearching: boolean
  isSorting: boolean
  isSortedBy: string
  sortDirection: 'asc' | 'desc'
  current: {
    data: MovieType | null
    isLoading: boolean
    getQuotes: (
      id: string,
      options?: GetEntityListGenericOptionsType,
    ) => Promise<void>
    quotes: {
      data: QuoteType[]
      pagination: PaginationType | null
      isLoading: boolean
      isLoadingMore: boolean
      getCharacterName: (id?: string) => string | null
    }
  }
}

interface IProviderProps {
  children: React.ReactNode
}

export const ReactContext = createContext<IMovieContextProps>(
  {} as IMovieContextProps,
)

export const MovieProvider: React.FC<IProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<MovieType[]>([])
  const [pagination, setPagination] = useState<PaginationType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPaginating, setIsPaginating] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isSorting, setIsSorting] = useState(false)
  const [isSortedBy, setIsSortedBy] = useState('id')
  const [sortDirection, setSortDirection] = useState<OrderDirectionType>('desc')
  const [movie, setMovie] = useState<MovieType | null>(null)
  const [isLoadingCurrent, setIsLoadingCurrent] = useState(false)
  const [quotes, setQuotes] = useState<QuoteType[]>([])
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false)
  const [isLoadingMoreQuotes, setIsLoadingMoreQuotes] = useState(false)
  const [quotesPagination, setQuotesPagination] =
    useState<PaginationType | null>(null)
  const [characters, setCharacters] = useState<CharacterType[]>([])

  const LifeCycleMemo = useLifeCycleMemo()

  const getMovies = useCallback(
    async (options = {} as GetEntityListGenericOptionsType) => {
      const {
        search,
        page = 1,
        orderBy = '_id',
        order = 'asc',
        limit = 48,
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

      const lifeCycleMemoKey = `movies:${JSON.stringify(params)}`

      const { data, pagination: paginationData } = await LifeCycleMemo.get<
        RepositoryStoredPaginatedDataType<MovieType>
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
          } = await Api.get<GetPaginatedResultReturnType<MovieType>>('/movie', {
            params,
          })

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
          toast.error('Error while fetching movies data')

          return {
            data: [],
            pagination: null,
          }
        }
      })

      setMovies(data)
      setPagination(paginationData)

      setIsLoading(false)
      setIsPaginating(false)
      setIsSearching(false)
      setIsSorting(false)
    },
    [LifeCycleMemo],
  )

  const getMovie = useCallback(
    async (id: string) => {
      setIsLoadingCurrent(true)

      const lifeCycleMemoKey = `movies:${id}`

      const { data } = await LifeCycleMemo.get<
        RepositoryStoredPaginatedDataType<MovieType>
      >(lifeCycleMemoKey, async () => {
        try {
          const {
            data: { docs },
          } = await Api.get<GetPaginatedResultReturnType<MovieType>>(
            `/movie/${id}`,
          )

          const paginatedData = {
            data: docs,
            pagination: null,
          }

          LifeCycleMemo.set(lifeCycleMemoKey, paginatedData)

          return paginatedData
        } catch (_) {
          toast.error('Error while fetching movie data')

          return {
            data: [],
            pagination: null,
          }
        }
      })

      setMovie(data?.[0] ?? null)
      setIsLoadingCurrent(false)
    },
    [LifeCycleMemo],
  )

  const getQuotes = useCallback(
    async (id: string, options = {} as GetEntityListGenericOptionsType) => {
      // pre-fetch characters data
      if (!characters.length) {
        const {
          data: { docs: charactersData },
        } = await Api.get<GetPaginatedResultReturnType<CharacterType>>(
          '/character',
          {
            params: { limit: 9999 },
          },
        )

        setCharacters(charactersData)
      }

      const { limit = 30, page = 1 } = options
      const params = {
        page,
        limit,
      }

      if (page === 1) {
        setQuotesPagination((prev) =>
          prev ? { ...prev, isLastPage: false } : prev,
        )
        setIsLoadingQuotes(true)
      } else {
        setIsLoadingMoreQuotes(true)
      }

      const lifeCycleMemoKey = `movies:${id}:${JSON.stringify(params)}:quotes`

      const { data, pagination: paginationData } = await LifeCycleMemo.get<
        RepositoryStoredPaginatedDataType<QuoteType>
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
          } = await Api.get<GetPaginatedResultReturnType<QuoteType>>(
            `/movie/${id}/quote`,
            { params },
          )

          const paginatedData = {
            data: docs,
            pagination: {
              total,
              limit: paginationLimit,
              offset,
              page: currentPage,
              pages,
              isLastPage: docs.length < limit,
            },
          }

          LifeCycleMemo.set(lifeCycleMemoKey, paginatedData)

          return paginatedData
        } catch (_) {
          toast.error('Error while fetching movie quote data')

          return {
            data: [],
            pagination: null,
          }
        }
      })

      setQuotes((prev) => [...(page === 1 ? [] : prev), ...data])
      setQuotesPagination(paginationData)
      setIsLoadingQuotes(false)
      setIsLoadingMoreQuotes(false)
    },
    [LifeCycleMemo, characters.length],
  )

  const getCharacterName = useCallback(
    (id?: string) =>
      id ? characters?.find((c) => c._id === id)?.name ?? null : null,
    [characters],
  )

  return (
    <ReactContext.Provider
      value={useMemo(
        () => ({
          getAll: getMovies,
          getById: getMovie,
          data: movies,
          pagination,
          isLoading,
          isPaginating,
          isSearching,
          isSorting,
          isSortedBy,
          sortDirection,
          current: {
            data: movie,
            isLoading: isLoadingCurrent,
            getQuotes,
            quotes: {
              data: quotes,
              pagination: quotesPagination,
              isLoading: isLoadingQuotes,
              isLoadingMore: isLoadingMoreQuotes,
              getCharacterName,
            },
          },
        }),
        [
          getCharacterName,
          getMovie,
          getMovies,
          getQuotes,
          isLoading,
          isLoadingCurrent,
          isLoadingMoreQuotes,
          isLoadingQuotes,
          isPaginating,
          isSearching,
          isSortedBy,
          isSorting,
          movie,
          movies,
          pagination,
          quotes,
          quotesPagination,
          sortDirection,
        ],
      )}
    >
      {children}
    </ReactContext.Provider>
  )
}

export const useMovie = (): IMovieContextProps => {
  const context = useContext(ReactContext)

  if (!context) {
    // eslint-disable-next-line no-console
    console.error('useMovie must be within MovieProvider')
  }

  return context
}
