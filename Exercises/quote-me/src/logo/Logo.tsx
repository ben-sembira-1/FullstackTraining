import React, { FunctionComponent } from 'react'
import logoImage from './logo.png'
import './Logo.css'

export const Logo: FunctionComponent = () => (
  <img src={logoImage} className='logo_image' />
)

export default Logo
