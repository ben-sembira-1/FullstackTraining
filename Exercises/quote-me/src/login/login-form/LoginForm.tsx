import React, { FunctionComponent, useState } from 'react'
import User from '../../interfaces/user'
import { logIn } from '../../server-protocol/login'
import { Input, InputType } from './Input/TextInput'

import './LoginForm.css'

type LoginFormProps = {
  onLogin: (user: User | undefined) => void
}

// HELP:  I want to create a type for the NO_ERROR value so it will be valid to write: useState<string | NO_ERROR>
//        but eslint says it is not a good idea and that I should no declare types and variables with the same name.
//        What do you think is the best way to deal with it?
const NO_ERROR = undefined
const EMPTY_USERNAME = ''
const EMPTY_PASSWORD = ''

export const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
  const [username, setUsername] = useState<string>(EMPTY_USERNAME)
  const [password, setPassword] = useState<string>(EMPTY_PASSWORD)
  const [errorMessage, setErrorMessage] = useState<string | typeof NO_ERROR>(NO_ERROR)
  return (
    <>
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
        <button
          onClick={
            () => {
              setErrorMessage(NO_ERROR)
              logIn(username, password)
                .then((user) => props.onLogin(user))
                .catch((reason) => {
                  props.onLogin(undefined)
                  setErrorMessage(reason.cause !== undefined ? reason.cause : 'Unknown error')
                })
            }
          }
        >
        Login
        </button>
        <button>
          Register
        </button>
      </span>
      <div className='error_message'>{errorMessage === NO_ERROR ? null : errorMessage}</div>
    </>
  )
}
