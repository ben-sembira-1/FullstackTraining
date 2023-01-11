import { describe, expect, it } from '@jest/globals'
import { v4 as uuidv4 } from 'uuid'
import { register } from './register'
import User, { NO_CONNECTED_USER } from '../interfaces/user'

const VALID_IMAGE_URL = 'https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg'

describe('register', () => {
  const validUser = (): User => { return { firstName: 'test', lastName: 'test', photoUrl: VALID_IMAGE_URL, uuid: 'test', username: `test-${uuidv4()}` } }
  it('should not throw anything with a valid user', async () => {
    await expect(register(validUser(), 'test-password')).resolves
  })
  it('should throw when not-connected literal is given as username', async () => {
    const invalidUser: User = { ...validUser(), username: NO_CONNECTED_USER }
    await expect(register(invalidUser, 'test-password')).rejects.toThrow()
  })
  it.each([
    [''],
    [' space_at_the_start'],
    ['space between'],
    ['space_at_the_end ']
  ])(
    'should throw when invalid username is given: \'%s\'',
    async (username) => {
      const invalidUsernameUser: User = { ...validUser(), username }
      await expect(register(invalidUsernameUser, 'test-password')).rejects.toThrow()
    }
  )
  it.each([
    ['', 'test'],
    [' ', 'test'],
    ['test', ''],
    ['test', ' '],
    ['', ''],
    [' ', ' ']
  ])(
    'should throw when empty name is given: firstname-\'%s\' lastname-\'%s\'',
    async (firstName, lastName) => {
      const invalidNameUser: User = { ...validUser(), firstName, lastName }
      await expect(register(invalidNameUser, 'test-password')).rejects.toThrow()
    }
  )
  it('should throw when username is taken', async () => {
    const sameUser = validUser()
    await register(sameUser, 'test-password')
    await expect(register(sameUser, 'test-password')).rejects.toThrow()
  })
  it('should throw when broken photo url is given', async () => {
    const invalidPhotoURLUser: User = { ...validUser(), photoUrl: '' }
    await expect(register(invalidPhotoURLUser, 'test-password')).rejects.toThrow()
  })
})
