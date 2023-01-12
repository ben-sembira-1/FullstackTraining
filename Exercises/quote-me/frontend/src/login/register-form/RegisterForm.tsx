import React, { useState } from 'react'
import { register } from '../../server-protocol/register'
import { capitalizeAllFirstLetters } from '../../utils/strings'
import { Input, InputType } from '../Input/Input'

import './RegisterForm.css'

type RegisterFormProps = {
  onRegister: () => void
  onLogin: () => void
  onError: (error: string) => void
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordReenter, setPasswordRenter] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [photoUrl, setImageUrl] = useState('')

  const registerAttempt = () => {
    if (password !== passwordReenter) {
      props.onError('Passwords does not match')
      return
    }
    register({ firstName, lastName, photoUrl, username, uuid: '' }, password)
      .then(props.onRegister)
      .catch(
        (reason) => { props.onError(reason.cause !== undefined ? reason.cause : 'Unknown error') }
      )
  }

  return (
    <>
      <h2>Register</h2>
      <Input type={InputType.TEXT} label='Username' placeholder='username' onChange={setUsername} value={username}/>
      <Input type={InputType.PASSWORD} label='Password' placeholder='password' onChange={setPassword} value={password}/>
      <Input type={InputType.PASSWORD} className={password === passwordReenter ? '' : 'not_matchin_password'} label='Renter password' placeholder='password' onChange={setPasswordRenter} value={passwordReenter}/>
      <Input type={InputType.TEXT} label='First name' placeholder='Israel' onChange={(name) => setFirstName(capitalizeAllFirstLetters(name))} value={firstName}/>
      <Input type={InputType.TEXT} label='Last name' placeholder='Israeli' onChange={(name) => setLastName(capitalizeAllFirstLetters(name))} value={lastName}/>
      <Input type={InputType.TEXT} label='Photo URL' placeholder='https://your.photo/here' onChange={setImageUrl} value={photoUrl}/>
      <span>
        <button className='dark_button' onClick={ registerAttempt }>Register</button>
        <button onClick={ props.onLogin }>Go To Login</button>
      </span>
    </>
  )
}

export default RegisterForm
