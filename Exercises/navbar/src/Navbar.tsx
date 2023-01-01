import React, { useState, FunctionComponent } from 'react'
import { Container } from './commonTypes'

interface NavitemProps extends Container {
  icon: React.ReactElement
}

export const Navitem: FunctionComponent<NavitemProps> = (props: NavitemProps) => {
  const [open, setOpen] = useState(false)
  return (
    <li className="nav-item">
      <button className="item-button button" onClick={() => setOpen(prevOpen => !prevOpen)}>
        {props.icon}
      </button>
      {open && props.children}
    </li>
  )
}

export const Navbar: FunctionComponent<Container> = (props: Container) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  )
}
