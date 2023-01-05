import React, { useState } from 'react'
import User from '../../interfaces/user'
import { capitalizeAllFirstLetters } from '../../utils/strings'
import { Input, InputType } from '../Input/Input'

type RegisterFormProps = {
  onRegister: (user: User, password: string) => void
  onLogin: () => void
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRenter, setPasswordRenter] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [photoUrl, setImageUrl] = useState('')

  const register = () => props.onRegister({ firstName, lastName, photoUrl, username, uuid: '' }, password)

  return (
    <>
      <h2>Register</h2>
      <Input type={InputType.TEXT} label='Username' placeholder='username' onChange={setUsername} value={username}/>
      <Input type={InputType.PASSWORD} label='Password' placeholder='password' onChange={setPassword} value={password}/>
      <Input type={InputType.PASSWORD} label='Renter password' placeholder='password' onChange={setPasswordRenter} value={passwordRenter}/>
      <Input type={InputType.TEXT} label='First name' placeholder='Israel' onChange={(name) => setFirstName(capitalizeAllFirstLetters(name))} value={firstName}/>
      <Input type={InputType.TEXT} label='Last name' placeholder='Israeli' onChange={(name) => setLastName(capitalizeAllFirstLetters(name))} value={lastName}/>
      <Input type={InputType.TEXT} label='Photo URL' placeholder='https://your.photo/here' onChange={setImageUrl} value={photoUrl}/>
      <span>
        <button className='dark_button' onClick={ register }>Register</button>
        <button onClick={ props.onLogin }>Go To Login</button>
      </span>
    </>
  )
}

export default RegisterForm
