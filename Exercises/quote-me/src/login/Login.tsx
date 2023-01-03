import React, { FunctionComponent } from 'react'
import { User } from '../interfaces/user'
import { LoginForm } from './login-form/LoginForm'
import { Logo } from '../logo/Logo'
import HorizontalDiv from '../utils/HorizontalDiv/HorizontalDiv'

type LoginProps = {
  onLogin: (user: User | undefined) => void
}

const Login: FunctionComponent<LoginProps> = (props) => {
  return (
    <HorizontalDiv>
      <Logo />
      <LoginForm onLogin={ props.onLogin } />
    </HorizontalDiv>
  )
}

export default Login
