import React, { useContext, useState } from 'react'
import { ConnectedUser } from '../contexts'
import { User } from '../interfaces/user'

import './UserThumbnail.css'

type ValidUserThumbnailProps = {
  user: User
}

const ValidUserThumbnail: React.FC<ValidUserThumbnailProps> = (props) => {
  const [dropDownOpen, setDropDownOpen] = useState(false)
  return (
    <div className='profile_nav'>
      <div className='profile_thumnail' onClick={() => setDropDownOpen((oldValue) => !oldValue)}>
        <img className='profile_thumnail-image' src={props.user.photoUrl}/>
        <label className='profile_thumnail-name'>{props.user.firstName}</label>
      </div>
      {
        dropDownOpen &&
        <div className='profile_dropdown'>
          Dropdown here
        </div>
      }
    </div>
  )
}

const UserThumbnail = () => {
  const connectedUser = useContext(ConnectedUser)

  return (
    <>
      {
        connectedUser !== undefined
          ? <ValidUserThumbnail user={connectedUser}/>
          : null
      }
    </>
  )
}

export default UserThumbnail
