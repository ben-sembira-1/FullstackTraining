import React from 'react';
import { ReactComponent as AccountIcon } from './icons/account.svg'
import { ReactComponent as CreateIcon } from './icons/pencil-outline.svg'
import { ReactComponent as SettingsIcon } from './icons/cog-outline.svg'

function App() {
  return (
    <Navbar>
      <Navitem icon={<AccountIcon/>}/>
      <Navitem icon={<CreateIcon/>}/>
      <Navitem icon={<SettingsIcon/>}/>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>
        {props.children}
      </ul>
    </nav>
  );
}

function Navitem(props) {
  return (
    <li className='nav-item'>
      <button href='#' className='item-button'>{props.icon}</button>
    </li>
  );
}

export default App;
