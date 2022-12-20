import React, { useState } from "react";

export function Navbar({ children }) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{children}</ul>
    </nav>
  );
}

export function Navitem({ icon, children }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <button className="item-button button" onClick={() => setOpen(!open)}>
        {icon}
      </button>
      {open && children}
    </li>
  );
}
