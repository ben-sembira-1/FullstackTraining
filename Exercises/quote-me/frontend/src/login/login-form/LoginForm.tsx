import React, { FunctionComponent, useState } from 'react'
import User from '../../interfaces/user'
import { logIn } from '../../server-protocol/login'
import { Input, InputType } from '../Input/Input'

import './LoginForm.css'

type LoginFormProps = {
  onLogin: (user: User) => void
  onRegister: () => void
  onError: (error: string) => void
}

const EMPTY_USERNAME = ''
const EMPTY_PASSWORD = ''

export const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
  const [username, setUsername] = useState<string>(EMPTY_USERNAME)
  const [password, setPassword] = useState<string>(EMPTY_PASSWORD)

  const loginAttempt = (username: string, password: string) => {
    logIn(username, password)
      .then((user) => props.onLogin(user))
      .catch((reason) => {
        props.onError(reason.cause !== undefined ? reason.cause : 'Unknown error')
      })
  }

  return (
    <>
      <h2>Login</h2>
      <Input
        type={InputType.TEXT}
        label='username'
        placeholder='username'
        onChange={setUsername}
        value={username}
      />

      <Input
        type={InputType.PASSWORD}
        label='password (NOT SECURE)'
        placeholder='password'
        onChange={setPassword}
        value={password}
      />
      <span>
        <button className='dark_button' onClick={ () => loginAttempt(username, password) }>Login</button>
        <button onClick={ props.onRegister }>Register</button>
      </span>
    </>
  )
}
