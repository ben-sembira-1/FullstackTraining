import { v4 as uuidv4 } from 'uuid'
import { User } from '../interfaces/user'

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
  const exampleUser: User = { firstName: 'Yoel', lastName: 'Basin', uuid: uuidv4(), photoUrl: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.matnasgan.org.il%2Fhtml5%2FEventproLookup.taf%3Ffunction%3Ddetails%26_ID%3D28047%26did%3D4450%26G%3D%26SM%3D&psig=AOvVaw1dXe9cD32_Mf_Qx5s4WUVc&ust=1672315643798000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIDElbGjnPwCFQAAAAAdAAAAABAE' }
  const answer = password !== 'pass' || username !== 'yoel' ? '' : JSON.stringify(exampleUser)
  const userRepr = await serverQueryMock(`request: login to ${username} with password: ${password}`, answer)
  if (userRepr === '') {
    throw new WrongCredentialsError('Wrong Password or Username')
  }
  return JSON.parse(userRepr)
}
