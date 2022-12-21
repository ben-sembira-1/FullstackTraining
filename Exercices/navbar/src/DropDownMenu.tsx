import React, { FunctionComponent, useEffect, useState } from 'react'

import { CSSTransition } from 'react-transition-group'

import { ReactComponent as RightChevron } from './icons/chevron-right.svg'
import { ReactComponent as LeftChevron } from './icons/chevron-left.svg'
import { ReactComponent as SettingsIcon } from './icons/cog-outline.svg'

interface MenuLinkItemProps {
  onClick?: () => void
  leftIcon?: React.ReactSVGElement
  rightIcon?: React.ReactSVGElement
  label: string
}

function MenuLinkItem (props: MenuLinkItemProps): React.ReactElement {
  return (
    <a className="drop-down-link-item button" onClick={props.onClick}>
      <span className="item-button">{props.leftIcon}</span>
      {props.label}
      <span className="item-button drop-down-item-right-icon">{props.rightIcon}</span>
    </a>
  )
}

export function DropDownMenu (): React.ReactElement {
  const UNMOUNT_TIMEOUT = 500

  const [activeMenu, setActiveMenu] = useState<string>('')
  const [menuHeight, setMenuHeight] = useState<any>(null)

  const setHeightBeforeRender = (htmlElement: { offsetHeight: string }): void => {
    console.log('Setting height to: ' + htmlElement.offsetHeight)
    setMenuHeight(htmlElement.offsetHeight)
  }

  // (jsx hack) This makes the onEnter of the first menu run. Just setting the initial state to be this, does not do it.
  useEffect(
    () => setActiveMenu('main-menu'),
    []
  )

  const MainMenu: FunctionComponent = () => {
    return <>
      <h2>Main Menu</h2>
      {/* <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<RightChevron />} onClick={() => setActiveMenu('secondary-menu-1')} label='Go to 1'/>
      <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<RightChevron />} onClick={() => setActiveMenu('secondary-menu-2')} label='Go to 2'/> */}
      <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<RightChevron />} onClick={() => setActiveMenu('secondary-menu-1')} label='Go to 1'/>
      <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<RightChevron />} onClick={() => setActiveMenu('secondary-menu-2')} label='Go to 2'/>
    </>
  }

  const SubMenu1: FunctionComponent = () => {
    return <>
      <h2>Menu 1</h2>
      <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<LeftChevron />} onClick={() => setActiveMenu('main-menu')} label="back"/>
      <MenuLinkItem label='Regular option'/>
      <MenuLinkItem label='Regular option'/>
      <MenuLinkItem label='Regular option'/>
      <MenuLinkItem label='Regular option'/>
      <MenuLinkItem label='Regular option'/>
      <MenuLinkItem label='Regular option'/>
    </>
  }

  const SubMenu2: FunctionComponent = () => {
    return <>
      <h2>Menu 2</h2>
      <MenuLinkItem leftIcon={<SettingsIcon />} rightIcon={<LeftChevron />} onClick={() => setActiveMenu('main-menu')} label="back"/>
      <MenuLinkItem label='Regular option'/>
      <MenuLinkItem label='Regular option'/>
    </>
  }
  // HELP: I failed to make the drop down list open with a transition (as if it was with height 0 and then opend).
  // HELP: I failed to create a closure that creates a TransitionableSubMenu with the 2 states.

  return (
    <div
      className="drop-down-menu"
      style={{ height: menuHeight }}
    >
      <CSSTransition
        in={activeMenu === 'main-menu'}
        unmountOnExit
        timeout={UNMOUNT_TIMEOUT}
        classNames={'menu-primary'}
        onEnter={setHeightBeforeRender}
      >
        <div className="menu">
          <MainMenu />
        </div>

      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'secondary-menu-1'}
        unmountOnExit
        timeout={UNMOUNT_TIMEOUT}
        classNames={'menu-secondary'}
        onEnter={setHeightBeforeRender}
      >
        <div className="menu">
          <SubMenu1 />
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'secondary-menu-2'}
        unmountOnExit
        timeout={UNMOUNT_TIMEOUT}
        classNames={'menu-secondary'}
        onEnter={setHeightBeforeRender}
      >
        <div className="menu">
          <SubMenu2 />
        </div>
      </CSSTransition>
    </div>
  )
}
