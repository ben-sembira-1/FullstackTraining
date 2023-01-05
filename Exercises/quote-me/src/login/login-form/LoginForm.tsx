import React, { FunctionComponent, useState } from 'react'
import { Input, InputType } from '../Input/Input'

import './LoginForm.css'

type LoginFormProps = {
  onLogin: (username: string, password: string) => void
  onRegister: () => void
}

const EMPTY_USERNAME = ''
const EMPTY_PASSWORD = ''

export const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
  const [username, setUsername] = useState<string>(EMPTY_USERNAME)
  const [password, setPassword] = useState<string>(EMPTY_PASSWORD)
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
        <button className='dark_button' onClick={ () => props.onLogin(username, password) }>Login</button>
        <button onClick={ props.onRegister }>Register</button>
      </span>
    </>
  )
}
