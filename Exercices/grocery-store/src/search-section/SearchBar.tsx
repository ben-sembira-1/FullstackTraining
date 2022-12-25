import React, { FunctionComponent } from 'react'
import { TextInput, ToggleInput } from './Input'

interface SearchBarProps {
  searchValue: string
  onSearchValueChange: (s: string) => void
  onlyInStock: boolean
  onOnlyInStockChange: (onlyInStock: boolean) => void
}

export const SearchBar: FunctionComponent<SearchBarProps> = (props) => {
  return (
    <div>
      <TextInput
        placeholder="Search..."
        value={props.searchValue}
        onValueChange={props.onSearchValueChange}
      />
      <ToggleInput
        label="Only show products in stock"
        checked={props.onlyInStock}
        onCheckedChange={props.onOnlyInStockChange}
      />
    </div>
  )
}
