export type PaginationType = {
  total: number
  limit: number
  offset: number
  page: number
  pages: number
  isLastPage?: boolean
}

export type GetPaginatedResultReturnType<T> = PaginationType & {
  docs: T[]
}

export type RepositoryStoredPaginatedDataType<T> = {
  data: T[]
  pagination: PaginationType | null
}

export type OrderDirectionType = 'asc' | 'desc'

export type GetEntityListGenericOptionsType = {
  search?: string
  page?: number
  orderBy?: string
  order?: OrderDirectionType
  limit?: number
  loadingType?: 'full' | 'paginate' | 'search' | 'sort'
}
