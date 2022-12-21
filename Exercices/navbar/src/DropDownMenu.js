import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { CSSTransition } from 'react-transition-group'

import { ReactComponent as RightChevron } from './icons/chevron-right.svg'
import { ReactComponent as LeftChevron } from './icons/chevron-left.svg'
import { ReactComponent as SettingsIcon } from './icons/cog-outline.svg'

function MenuLinkItem
({ onClick, leftIcon, rightIcon, children }) {
  return (
    <a className="drop-down-link-item button" onClick={onClick}>
      <span className="item-button">{leftIcon}</span>
      {children}
      <span className="item-button drop-down-item-right-icon">{rightIcon}</span>
    </a>
  )
}
MenuLinkItem.propTypes = {
  onClick: PropTypes.func,
  leftIcon: PropTypes.shape('svg'),
  rightIcon: PropTypes.shape('svg'),
  children: PropTypes.array.isRequired
}

function Menu ({ header, children }) {
  return (
    <div className="menu">
      <h2>{header}</h2>
      {children}
    </div>
  )
}
Menu.propTypes = {
  header: PropTypes.string,
  children: PropTypes.array
}

export function DropDownMenu
() {
  const [activeMenu, setActiveMenu] = useState('main-menu')
  const [menuHeight, setMenuHeight] = useState(null)
  const dropDownMenu = useRef(null)
  // This useEffect is for the first transition
  useEffect(() => {
    const menuComputedStyle = getComputedStyle(dropDownMenu.current)
    setMenuHeight(menuComputedStyle.height)
  }, [setMenuHeight])

  const MainMenu = () => {
    <Menu header='Main Menu'>
      <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<RightChevron/>} onClick={() => setActiveMenu('secondary-menu-1')}>Go to 1</MenuLinkItem>
      <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<RightChevron/>} onClick={() => setActiveMenu('secondary-menu-2')}>Go to 2</MenuLinkItem>
    </Menu>
  }

  const SubMenu1 = () => {
    <Menu header='Menu 1'>
      <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<LeftChevron/>} onClick={() => setActiveMenu('main-menu')}>back</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
    </Menu>
  }

  const SubMenu2 = () => {
    <Menu header='Menu 2'>
      <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<LeftChevron/>} onClick={() => setActiveMenu('main-menu')}>back</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
    </Menu>
  }
  // HELP: I failed to make the drop down list open with a transition (as if it was with height 0 and then opend).
  // HELP: I failed to create a closure that creates a TransitionableSubMenu with the 2 states.
  const timeout = 500
  const calculateHeight = (htmlElement) => setMenuHeight(htmlElement.offsetHeight)
  return (
    <div
      ref={dropDownMenu}
      className="drop-down-menu"
      style={{ height: menuHeight }}
    >
      <CSSTransition
      in={activeMenu === 'main-menu'}
      unmountOnExit
      timeout={timeout}
      classNames={'menu-primary'}
      onEnter={calculateHeight}
      className='menu-transition'
    >
      <MainMenu/>
      </CSSTransition>
      <CSSTransition
      in={activeMenu === 'secondary-menu-1'}
      unmountOnExit
      timeout={timeout}
      classNames={'menu-secondary'}
      onEnter={calculateHeight}
      className='menu-transition'
    >
      <SubMenu1/>
      </CSSTransition>
      <CSSTransition
      in={activeMenu === 'secondary-menu-2'}
      unmountOnExit
      timeout={timeout}
      classNames={'menu-secondary'}
      onEnter={calculateHeight}
      className='menu-transition'
    >
      <SubMenu2/>
    </CSSTransition>
    </div>
  )
}
