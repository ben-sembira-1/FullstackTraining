import React, { useContext } from 'react'
import { ConnectedUser } from '../contexts'

const HomePage = () => {
  const connectedUser = useContext(ConnectedUser)
  return (
    <div>
      <h1>I am the home page</h1>
      <article style={{ width: '300px' }}>
        {JSON.stringify(connectedUser)}
      </article>
    </div>
  )
}

export default HomePage
