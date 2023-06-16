/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { memo, useCallback, useState } from 'react'

import { CgClose } from 'react-icons/cg'
import { FaSearch } from 'react-icons/fa'

import { SearchButton, SearchContainer, SearchInput } from './styles'

interface ISearchProps {
  placeholder?: string
  showClearButton?: boolean
  isLoading?: boolean
  disabled?: boolean
  onSearch: (search: string) => void
  onClear?: () => void
}

const Search: React.FC<ISearchProps> = ({
  placeholder = 'Search',
  showClearButton = false,
  isLoading = false,
  disabled = false,
  onClear,
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = useCallback(
    () => onSearch(searchValue),
    [onSearch, searchValue],
  )

  const handleKeyUp = useCallback(
    ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
      if (key === 'Enter' && searchValue.length) {
        handleSearch()
      }
    },
    [handleSearch, searchValue],
  )

  const handleClear = useCallback(() => {
    setSearchValue('')
    onClear?.()
  }, [onClear])

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={({ target: { value } }) => setSearchValue(value)}
        onKeyUp={handleKeyUp}
        disabled={disabled || isLoading}
      />
      {!isLoading && (
        <>
          {showClearButton && (
            <SearchButton
              type="button"
              onClick={handleClear}
              disabled={disabled}
              title="Clear search"
            >
              <CgClose size={26} />
            </SearchButton>
          )}
          <SearchButton
            type="button"
            onClick={handleSearch}
            disabled={disabled || !searchValue.length}
            title="Search"
          >
            <FaSearch size={20} />
          </SearchButton>
        </>
      )}
    </SearchContainer>
  )
}

export default memo(Search)
