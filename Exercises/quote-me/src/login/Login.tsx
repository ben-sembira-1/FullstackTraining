import React, { FunctionComponent, useState } from 'react'
import { Logo } from '../logo/Logo'
import HorizontalDiv from '../utils/HorizontalDiv/HorizontalDiv'
import { LoginForm } from './login-form/LoginForm'
import RegisterForm from './register-form/RegisterForm'
import User from '../interfaces/user'
import './Login.css'

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

  return (
    <HorizontalDiv>
      <div className='logo_container'>
        <Logo />
      </div>
      {
        loginPhase === LoginPhase.LOGIN
          ? <LoginForm
            onLogin={ (user) => { setErrorMessage(NO_ERROR); props.onLogin(user) }}
            onRegister={() => { setErrorMessage(NO_ERROR); setLoginPhase(LoginPhase.REGISTER) }}
            onError={setErrorMessage}
          />
          : <RegisterForm
            onRegister={() => { setErrorMessage(NO_ERROR); setLoginPhase(LoginPhase.LOGIN) }}
            onLogin={() => { setErrorMessage(NO_ERROR); setLoginPhase(LoginPhase.LOGIN) }}
            onError={setErrorMessage}
          />
      }
      <div className='error_message'>{errorMessage === NO_ERROR ? null : errorMessage}</div>

    </HorizontalDiv>
  )
}

export default Login
