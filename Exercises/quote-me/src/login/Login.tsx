import React, { FunctionComponent, useState } from 'react'
import { ConnectedUser } from '../contexts'
import { LoginForm } from '../login-form/LoginForm'
import { Logo } from '../logo/Logo'
import HorizontalDiv from '../utils/HorizontalDiv'
import './Login.css'

const Login: FunctionComponent = () => {
  const [connectedUser, setConnectedUser] = useState('')
  return (
    <ConnectedUser.Provider value={connectedUser}>
      <HorizontalDiv>
        <Logo />
        <LoginForm onLogin={ setConnectedUser } />
      </HorizontalDiv>
    </ConnectedUser.Provider>
  )
}

export default Login
