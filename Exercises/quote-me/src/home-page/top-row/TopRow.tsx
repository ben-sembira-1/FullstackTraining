import React from 'react'
import Logo from '../../logo/Logo'

import './TopRow.css'

const UserThumbnail = () => <h1>photo</h1>

const TopRow = () => {
  return (
    <div className='top_row'>
      <div className='top_row-logo'>
        <Logo/>
      </div>
      <div className='top_row-phrase'>
        May the most bizarre, delusional and mad person win.
      </div>
      <div className='top_row-user_thumbnail'>
        <UserThumbnail/>
      </div>
    </div>
  )
}

export default TopRow
