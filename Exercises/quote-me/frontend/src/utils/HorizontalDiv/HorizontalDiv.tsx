import React from 'react'
import './HorizontalDiv.css'

export const HorizontalDiv: React.FC<React.PropsWithChildren> = (props) => (
  <div>
    {props.children}
  </div>
)

export default HorizontalDiv
