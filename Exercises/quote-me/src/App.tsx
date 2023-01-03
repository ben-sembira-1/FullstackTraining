import React, { FunctionComponent, useState } from 'react'
import { ConnectedUser } from './contexts'
import HomePage from './home-page/HomePage'
import { User } from './interfaces/user'
import Login from './login/Login'

const App: FunctionComponent = () => {
  const [connectedUser, setConnectedUser] = useState<User | undefined>(undefined)
  return (
    <ConnectedUser.Provider value={connectedUser}>
      {
        connectedUser === undefined
          ? <Login onLogin={ setConnectedUser } />
          : <HomePage/>
      }
    </ConnectedUser.Provider>
  )
}

export default App
