import React, { FunctionComponent } from 'react'
import { LoginForm } from '../login-form/LoginForm'
import { Logo } from '../logo/Logo'
import HorizontalDiv from '../utils/HorizontalDiv'
import './Login.css'

const Login: FunctionComponent = () => {
  return (
    <HorizontalDiv>
      <Logo />
      <LoginForm />
    </HorizontalDiv>
  )
}

export default Login