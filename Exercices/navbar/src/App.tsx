import React, { FunctionComponent } from 'react'

import { Navbar, Navitem } from './Navbar'
import { DropDownMenu } from './DropDownMenu'
import { ReactComponent as AccountIcon } from './icons/account.svg'
import { ReactComponent as CreateIcon } from './icons/pencil-outline.svg'
import { ReactComponent as SettingsIcon } from './icons/cog-outline.svg'

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
