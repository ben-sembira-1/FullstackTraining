import React from 'react'
import User from '../interfaces/user'

import './UserThumbnail.css'

type UserThumbnailProps = {
  user: User
}

const UserThumbnail: React.FC<UserThumbnailProps> = (props) => {
  return (
    <div className='profile_thumnail'>
      <img className='profile_thumnail-image' src={props.user.photoUrl}/>
      <label className='profile_thumnail-name'>{props.user.firstName}</label>
    </div>
  )
}

export default UserThumbnail
