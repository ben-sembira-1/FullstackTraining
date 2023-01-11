import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import User, { NO_CONNECTED_USER } from '../interfaces/user'

type UserWithPassword = {
  user: User
  password: string
}
export const gAllUsers: Map<string, UserWithPassword> = new Map<string, UserWithPassword>()

export class InvalidRegisterDetails extends Error {
  constructor (couse?: string) {
    super()
    this.cause = couse !== undefined ? couse : 'Unkown problem with registers details'
  }
}

class NameError extends InvalidRegisterDetails {
  constructor (couse?: string) {
    super(`Invalid name${couse !== undefined ? ': ' + couse : ''}`)
  }
}

class UsernameInUseError extends InvalidRegisterDetails { constructor () { super('Username already in use') } }

class InvalidPasswordError extends InvalidRegisterDetails { }

class InvalidImageError extends InvalidRegisterDetails { constructor () { super('Invalid image') } }

class InvalidUsernameError extends InvalidRegisterDetails { }

const checkPasswordValidity = (password: string) => {
  if (password.length < 4) throw new InvalidPasswordError('Password length should be at least 4')
}

const checkImageValidity = async (url: string) => {
  axios.get(url)
    .catch(() => { throw new InvalidImageError() })
}

const checkUsernameNotInUse = async (username: string) => {
  await setTimeout(() => {
    if (gAllUsers.has(username)) throw new UsernameInUseError()
  }, 200)
}

const checkUserValidity = async (user: User) => {
  if (user.firstName.trim().length === 0) throw new NameError('Please put a first name')
  if (user.lastName.trim().length === 0) throw new NameError('Please put a last name')
  if (user.username.includes(' ')) throw new InvalidUsernameError('The username should not include whitespaces')
  if (user.username.length === 0) throw new InvalidUsernameError('Please put a username')
  if (user.username.toLowerCase() === NO_CONNECTED_USER.toLowerCase()) throw new InvalidUsernameError('You hacker! Choose a different username...')
  await checkImageValidity(user.photoUrl)
}

const createNewUserRequest = async (user: User, password: string) => {
  return await new Promise<void>((resolve, reject) => setTimeout(() => {
    if (gAllUsers.has(user.username)) {
      reject(new UsernameInUseError())
    }

    gAllUsers.set(user.username, {
      user: {
        ...user,
        uuid: uuidv4()
      },
      password
    })
    resolve()
  }, 200))
}

export const register = async (user: User, password: string) => {
  checkPasswordValidity(password)
  await Promise.all([
    await checkUsernameNotInUse(user.username),
    await checkUserValidity(user)
  ])

  await createNewUserRequest(user, password)
}
