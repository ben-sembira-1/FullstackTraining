import React from 'react'
import Logo from '../../logo/Logo'
import UserThumbnail from '../../user-thumbnail/UserThumbnail'

import './TopRow.css'

const TopRow = () => {
  return (
    <div className='top_row'>
      <div className='top_row-logo'>
        <Logo/>
      </div>
      <div className='top_row-phrase'>
        May the most bizarre, delusional and mad person win.
      </div>
      <button className='top_row-add_new_button'>Add New Quote</button>
      <div className='top_row-user_thumbnail'>
        <UserThumbnail/>
      </div>
    </div>
  )
}

export default TopRow
