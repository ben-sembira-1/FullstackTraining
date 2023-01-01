import React, { FunctionComponent } from 'react'
import logoImage from './logo.png'
import './Logo.css'

export const Logo: FunctionComponent = () => (
  <div className='logo'>
    <img src={logoImage} className='logo_image' />
    <h1>Quote Me</h1>
  </div>
)

export default Logo
