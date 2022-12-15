import React from 'react';

function App() {
  return (
    <Navbar>
      <Navitem icon="🦷"/>
      <Navitem icon="🫀"/>
      <Navitem icon="👀"/>
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
