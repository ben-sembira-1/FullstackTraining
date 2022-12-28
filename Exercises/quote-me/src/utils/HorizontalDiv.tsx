import React, { FunctionComponent } from 'react'
import './HorizontalDiv.css'

type HorizontalDivProps = {
  children: React.ReactElement | React.ReactElement[]
}

export const HorizontalDiv: FunctionComponent<HorizontalDivProps> = (props) => (
  <div>
    {props.children}
  </div>
)

export default HorizontalDiv
