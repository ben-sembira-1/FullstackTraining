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
    return <>
      <h2>Main Menu</h2>
      <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<RightChevron />} onClick={() => setActiveMenu('secondary-menu-1')}>Go to 1</MenuLinkItem>
      <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<RightChevron />} onClick={() => setActiveMenu('secondary-menu-2')}>Go to 2</MenuLinkItem>
    </>
  }

  const SubMenu1 = () => {
    return <>
      <h2>Menu 1</h2>
      <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<LeftChevron />} onClick={() => setActiveMenu('main-menu')}>back</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
    </>
  }

  const SubMenu2 = () => {
    return <>
      <h2>Menu 2</h2>
      <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<LeftChevron />} onClick={() => setActiveMenu('main-menu')}>back</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
      <MenuLinkItem>Regular Option</MenuLinkItem>
    </>
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
      {/* CSSTransition has to have an explicit div inside it, putting a div as the wraper of MainMenu does not work. */}
      <CSSTransition
        in={activeMenu === 'main-menu'}
        unmountOnExit
        timeout={timeout}
        classNames={'menu-primary'}
        onEnter={calculateHeight}
        className='menu-transition'
      >
        <div className="menu">
          <MainMenu />
        </div>

      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'secondary-menu-1'}
        unmountOnExit
        timeout={timeout}
        classNames={'menu-secondary'}
        onEnter={calculateHeight}
        className='menu-transition'
      >
        <div className="menu">
          <SubMenu1 />
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'secondary-menu-2'}
        unmountOnExit
        timeout={timeout}
        classNames={'menu-secondary'}
        onEnter={calculateHeight}
        className='menu-transition'
      >
        <div className="menu">
          <SubMenu2 />
        </div>
      </CSSTransition>
    </div>
  )
}
