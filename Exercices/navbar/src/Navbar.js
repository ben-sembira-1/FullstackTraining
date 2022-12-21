import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DropDownMenu } from './DropDownMenu'

export function Navbar ({ children }) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{children}</ul>
    </nav>
  )
}
Navbar.propTypes = {
  children: PropTypes.arrayOf(Navitem)
}

export function Navitem ({ icon, children }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="nav-item">
      <button className="item-button button" onClick={() => setOpen(!open)}>
        {icon}
      </button>
      {open && children}
    </li>
  )
}
Navitem.propTypes = {
  icon: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.objectOf(DropDownMenu), PropTypes.arrayOf(PropTypes.objectOf(DropDownMenu))])
}
