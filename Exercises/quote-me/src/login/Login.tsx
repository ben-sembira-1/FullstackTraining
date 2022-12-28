import React, { FunctionComponent } from 'react'
import { Logo } from '../logo/Logo'
import { HorizontalDiv } from '../utils/HorizontalDiv'
import './Login.css'

const Login: FunctionComponent = () => {
  return (
    <HorizontalDiv>
      <Logo />
      <Logo />
    </HorizontalDiv>
  )
}

export default Login
