import { createContext } from 'react'
import { ConnectedUser, NO_CONNECTED_USER } from './interfaces/user'

export const ConnectedUserContext = createContext<ConnectedUser>(NO_CONNECTED_USER)
