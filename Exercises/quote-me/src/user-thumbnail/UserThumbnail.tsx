import React, { useState } from 'react'
import User from '../interfaces/user'

import './UserThumbnail.css'

type UserThumbnailProps = {
  user: User
}

const UserThumbnail: React.FC<UserThumbnailProps> = (props) => {
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

export default UserThumbnail
