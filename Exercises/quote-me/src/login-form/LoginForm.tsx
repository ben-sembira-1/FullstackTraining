import React, { FunctionComponent, useState } from 'react'
import { Input, InputType } from './Input/TextInput'

export const LoginForm: FunctionComponent = () => {
  const [username, setUsername] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)
  return (
    <>
      <Input
        type={InputType.TEXT}
        label='username'
        placeholder='git susername'
        onChange={setUsername}
        value={username === undefined ? '' : username}
      />

      <Input
        type={InputType.PASSWORD}
        label='password'
        placeholder='password'
        onChange={setPassword}
        value={password === undefined ? '' : password}
      />
      <span><button>Login</button><button>Register</button></span>

    </>
  )
}
