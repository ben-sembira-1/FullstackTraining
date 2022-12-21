import React, { FunctionComponent } from 'react'

import { Navbar, Navitem } from './Navbar'
import { DropDownMenu } from './DropDownMenu'
import AccountIcon from './icons/account.svg'
import CreateIcon from './icons/pencil-outline.svg'
import SettingsIcon from './icons/cog-outline.svg'

const App: FunctionComponent = () => {
  return (
    <Navbar>
      <Navitem icon={<AccountIcon />} />
      <Navitem icon={<CreateIcon />} />
      <Navitem icon={<SettingsIcon />}>
        <DropDownMenu />
      </Navitem>
    </Navbar>
  )
}

export default App
