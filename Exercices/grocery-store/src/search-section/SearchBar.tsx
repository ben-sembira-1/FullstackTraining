import React, { FunctionComponent } from 'react'
import { Container } from '../interfaces/commonTypes'

export const SearchBar: FunctionComponent<Container> = ({ children }) => {
  return (
        <div>
            {children}
        </div>
  )
}
