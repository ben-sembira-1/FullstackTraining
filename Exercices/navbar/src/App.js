import React from 'react';
import { Navbar, Navitem } from './Navbar';
import { DropDownLinkItem, DropDownMenu } from './DropDownMenu';
import { ReactComponent as AccountIcon } from './icons/account.svg';
import { ReactComponent as CreateIcon } from './icons/pencil-outline.svg';
import { ReactComponent as SettingsIcon } from './icons/cog-outline.svg';
import { ReactComponent as RightChevron } from './icons/chevron-right.svg';

function App() {
  return (
    <Navbar>
      <Navitem icon={<AccountIcon />} />
      <Navitem icon={<CreateIcon />} />
      <Navitem icon={<SettingsIcon />}>
        <DropDownMenu>
          <DropDownLinkItem leftIcon={<SettingsIcon />} rightIcon={<RightChevron />} href='#'>option-1</DropDownLinkItem>
          <DropDownLinkItem leftIcon={<SettingsIcon />} rightIcon={<RightChevron />} href='#'>option-2</DropDownLinkItem>
        </DropDownMenu>
      </Navitem>
    </Navbar>
  );
}



export default App;
