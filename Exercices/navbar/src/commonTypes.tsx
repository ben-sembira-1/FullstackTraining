import React from 'react'

export type Children = React.ReactElement | React.ReactElement[]

export interface Container {
  children?: Children
}
