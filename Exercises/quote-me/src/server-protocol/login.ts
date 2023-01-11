import User from '../interfaces/user'
import { gAllUsers } from './register'

const serverQueryMock = async (request: string, answer: string, timeoutms: number = 200): Promise<string> => {
  console.debug(`fetching the request: ${request}`)
  return await new Promise(
    (resolve) => setTimeout(() => resolve(answer), timeoutms)
  )
}

class WrongCredentialsError extends Error {
  constructor (errorMessage?: string) {
    super()
    this.cause = errorMessage !== undefined ? errorMessage : 'Unknown problem with credentials'
  }
}

const checkNotEmpty = (username: string, password: string): void => {
  if (username === '') throw new WrongCredentialsError('Empty username')
  else if (password === '') throw new WrongCredentialsError('Empty password')
}

export const logIn = async (username: string, password: string): Promise<User> => {
  checkNotEmpty(username, password)
  const answer = (gAllUsers.has(username) && gAllUsers.get(username)?.password === password)
    ? JSON.stringify(gAllUsers.get(username)?.user)
    : ''
  const userRepr = await serverQueryMock(`request: login to ${username} with password: ${password}`, answer)
  if (userRepr === '') {
    throw new WrongCredentialsError('Wrong Password or Username')
  }
  return JSON.parse(userRepr)
}
