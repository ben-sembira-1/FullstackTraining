type User = {
  firstName: string
  lastName: string
  username: string
  photoUrl: string
  uuid: string
}

export const NO_CONNECTED_USER = 'no-connected-user'

export type ConnectedUser = User | typeof NO_CONNECTED_USER

export default User
