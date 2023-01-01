import React, { FunctionComponent, useState } from 'react'
import { ConnectedUser } from '../contexts'
import { User } from '../interfaces/user'
import { LoginForm } from './login-form/LoginForm'
import { Logo } from '../logo/Logo'
import HorizontalDiv from '../utils/HorizontalDiv/HorizontalDiv'

const Login: FunctionComponent = () => {
  const [connectedUser, setConnectedUser] = useState<User | undefined>(undefined)
  return (
    <ConnectedUser.Provider value={connectedUser}>
      <HorizontalDiv>
        <Logo />
        <LoginForm onLogin={ setConnectedUser } />
        {JSON.stringify(connectedUser)}
      </HorizontalDiv>
    </ConnectedUser.Provider>
  )
}

export default Login
