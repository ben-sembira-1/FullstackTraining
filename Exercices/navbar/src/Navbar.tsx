import React, { useState, FunctionComponent } from 'react'
import { DropDownMenu } from './DropDownMenu'
import { Container } from './commonTypes'

interface NavitemInterface extends Container {
  icon: React.ReactSVGElement
}

export function Navitem (props: NavitemInterface) {
  const [open, setOpen] = useState(false)
  return (
    <li className="nav-item">
      <button className="item-button button" onClick={() => setOpen(!open)}>
        {props.icon}
      </button>
      {open && props.children}
    </li>
  )
}

export function Navbar (props: Container) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  )
}
