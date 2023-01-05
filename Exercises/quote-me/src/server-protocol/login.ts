import { v4 as uuidv4 } from 'uuid'
import User from '../interfaces/user'

const serverQueryMock = async (request: string, answer: string, timeoutms: number = 200): Promise<string> => {
  console.log(`fetching the request: ${request}`)
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
  const exampleUser: User = { firstName: 'Yoel', lastName: 'Basin', username: 'yoel', uuid: uuidv4(), photoUrl: 'http://www.matnasgan.org.il/html5/web/4450/28047ImageFile2.png' }
  const answer = password !== 'pass' || username !== 'yoel' ? '' : JSON.stringify(exampleUser)
  const userRepr = await serverQueryMock(`request: login to ${username} with password: ${password}`, answer)
  if (userRepr === '') {
    throw new WrongCredentialsError('Wrong Password or Username')
  }
  return JSON.parse(userRepr)
}
