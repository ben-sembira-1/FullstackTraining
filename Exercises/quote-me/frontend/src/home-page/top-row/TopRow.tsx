import React, { useContext } from 'react'
import { ConnectedUserContext } from '../../common'
import { NO_CONNECTED_USER } from '../../interfaces/user'
import Logo from '../../logo/Logo'
import UserThumbnail from '../../user-thumbnail/UserThumbnail'

import './TopRow.css'

const TopRow = () => {
  const connectedUser = useContext(ConnectedUserContext)

  return (
    <div className='top_row'>
      <div className='top_row-logo'>
        <Logo/>
      </div>
      <div className='top_row-phrase'>
        May the most bizarre, delusional and mad person win.
      </div>
      <button className='top_row-add_new_button dark_button'>Add New Quote</button>
      <div className='top_row-user_thumbnail'>
        {
          connectedUser !== NO_CONNECTED_USER
            ? <UserThumbnail user={connectedUser}/>
            : null
        }
      </div>
    </div>
  )
}

export default TopRow
