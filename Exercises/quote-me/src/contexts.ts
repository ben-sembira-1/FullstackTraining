import { createContext } from 'react'
import User from './interfaces/user'

export const ConnectedUser = createContext<User | undefined>(undefined)
