import React, { FunctionComponent, useState } from 'react'
// import { logIn } from '../server-protocol/login'
import { Input, InputType } from './Input/TextInput'

type LoginFormProps = {
  onLogin: (username: string) => void
}

export const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
  const [username, setUsername] = useState<string | undefined>(undefined)
  const [password, setPassword] = useState<string | undefined>(undefined)
  return (
    <>
      <Input
        type={InputType.TEXT}
        label='username'
        placeholder='username'
        onChange={setUsername}
        value={username === undefined ? '' : username}
      />

      <Input
        type={InputType.PASSWORD}
        label='password (NOT SECURE)'
        placeholder='password'
        onChange={setPassword}
        value={password === undefined ? '' : password}
      />
      <span>
        <button
          // onClick={
          //   async () => {
          //     await logIn(username, password)
          //       .then((user) => props.onLogin(user))
          //   }
          // }
        >
        Login
        </button>
        <button>
          Register
        </button>
      </span>
    </>
  )
}
