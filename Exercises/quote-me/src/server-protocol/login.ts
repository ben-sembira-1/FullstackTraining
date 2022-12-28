import { randomUUID } from 'crypto'
import { User } from '../interfaces/user'

const serverQueryMock = async (request: string, answer: string, timeoutms: number = 100): Promise<string> => {
  console.log(`fetching the request: ${request}`)
  return await new Promise(
    (resolve) => setTimeout(() => resolve(answer), timeoutms)
  )
}

export const logIn = async (username: string, password: string): Promise<User> => {
  const exampleUser: User = { firstName: 'Yoel', lastName: 'Basin', uuid: randomUUID(), photoUrl: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.matnasgan.org.il%2Fhtml5%2FEventproLookup.taf%3Ffunction%3Ddetails%26_ID%3D28047%26did%3D4450%26G%3D%26SM%3D&psig=AOvVaw1dXe9cD32_Mf_Qx5s4WUVc&ust=1672315643798000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIDElbGjnPwCFQAAAAAdAAAAABAE' }
  const userRepr = await serverQueryMock(`request: login to ${username} with password: ${password}`, JSON.stringify(exampleUser))
  return JSON.parse(userRepr)
}
