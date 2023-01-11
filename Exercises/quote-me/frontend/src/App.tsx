import React, { FunctionComponent, useState } from 'react'
import { ConnectedUserContext } from './common'
import HomePage from './home-page/HomePage'
import { ConnectedUser, NO_CONNECTED_USER } from './interfaces/user'
import Login from './login/Login'

const App: FunctionComponent = () => {
  const [connectedUser, setConnectedUser] = useState<ConnectedUser>(NO_CONNECTED_USER)
  return (
    <ConnectedUserContext.Provider value={connectedUser}>
      {
        connectedUser === NO_CONNECTED_USER
          ? <Login onLogin={ setConnectedUser } />
          : <HomePage/>
      }
    </ConnectedUserContext.Provider>
  )
}

export default App
