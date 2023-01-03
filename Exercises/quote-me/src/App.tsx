import React, { FunctionComponent, useState } from 'react'
import { ConnectedUser } from './contexts'
import HomePage from './home-page/HomePage'
import User from './interfaces/user'
import Login from './login/Login'

const App: FunctionComponent = () => {
  const temp = { firstName: 'Yoel', lastName: 'Basin', uuid: 'temp-yoel', photoUrl: 'http://www.matnasgan.org.il/html5/web/4450/28047ImageFile2.png' }
  const [connectedUser, setConnectedUser] = useState<User | undefined>(temp)
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
