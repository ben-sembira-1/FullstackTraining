import React, { FunctionComponent, useState } from 'react'
import User from '../interfaces/user'
import { LoginForm } from './login-form/LoginForm'
import { Logo } from '../logo/Logo'
import HorizontalDiv from '../utils/HorizontalDiv/HorizontalDiv'

import './Login.css'
import { logIn } from '../server-protocol/login'
import RegisterForm from './register-form/RegisterForm'

enum LoginPhase {
  LOGIN,
  REGISTER
}

// HELP:  I want to create a type for the NO_ERROR value so it will be valid to write: useState<string | NO_ERROR>
//        but eslint says it is not a good idea and that I should no declare types and variables with the same name.
//        What do you think is the best way to deal with it?
const NO_ERROR = undefined

type LoginProps = {
  onLogin: (user: User | undefined) => void
}

const Login: FunctionComponent<LoginProps> = (props) => {
  const [errorMessage, setErrorMessage] = useState<string | typeof NO_ERROR>(NO_ERROR)
  const [loginPhase, setLoginPhase] = useState<LoginPhase>(LoginPhase.LOGIN)

  const loginAttempt = (username: string, password: string) => {
    setErrorMessage(NO_ERROR)
    logIn(username, password)
      .then((user) => props.onLogin(user))
      .catch((reason) => {
        props.onLogin(undefined)
        setErrorMessage(reason.cause !== undefined ? reason.cause : 'Unknown error')
      })
  }

  const registerAttempt = (user: User, password: string) => {
    console.log('Register attempt')
  }

  return (
    <HorizontalDiv>
      <div className='logo_container'>
        <Logo />
      </div>
      {
        loginPhase === LoginPhase.LOGIN
          ? <LoginForm
            onLogin={loginAttempt}
            onRegister={() => setLoginPhase(LoginPhase.REGISTER)}
          />
          : <RegisterForm
            onRegister={registerAttempt}
            onLogin={() => setLoginPhase(LoginPhase.LOGIN)}
          />
      }
      <div className='error_message'>{errorMessage === NO_ERROR ? null : errorMessage}</div>

    </HorizontalDiv>
  )
}

export default Login
