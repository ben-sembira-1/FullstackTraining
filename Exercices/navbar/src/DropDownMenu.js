import React, { useEffect, useRef, useState } from 'react';

import { CSSTransition } from 'react-transition-group'

import { ReactComponent as RightChevron } from './icons/chevron-right.svg';
import { ReactComponent as LeftChevron } from './icons/chevron-left.svg';
import { ReactComponent as SettingsIcon } from './icons/cog-outline.svg';

function DropDownLinkItem(props) {
    return (
        <a href={props.href} className='drop-down-link-item button' onClick={props.onClick}>
            <span className='item-button'>{props.leftIcon}</span>
            {props.children}
            <span className='item-button drop-down-item-right-icon'>{props.rightIcon}</span>
        </a>
    );
}

function TransitionableSubMenu(props) {
    const defaultTimeout = 500;
    const [activeMenu, setActiveMenu] = props.activeMenuState;
    const [menuHeight, setMenuHeight] = props.menuHeightState;

    function calculateHeight(htmlElement) {
        setMenuHeight(htmlElement.offsetHeight);
    }

    return (
        <CSSTransition
            in={activeMenu === props.menuId}
            unmountOnExit
            timeout={props.timeout || defaultTimeout}
            classNames={props.primary ? 'menu-primary' : 'menu-secondary'}
            onEnter={calculateHeight}
            onEntered={calculateHeight}
        >
            <div className='menu'>
                <h1>{props.menuLabel}</h1>
                {
                    props.transitions.map(
                        (transition, index) => <DropDownLinkItem key={index} leftIcon={transition.icon || <SettingsIcon />} rightIcon={props.primary ? <RightChevron /> : <LeftChevron />} onClick={() => setActiveMenu(transition.goToMenu)}>{transition.label}</DropDownLinkItem>
                    )
                }
                {props.children}
            </div>
        </CSSTransition>
    );
}

export function DropDownMenu(props) {
    const activeMenuState = useState('main-menu');
    const menuHeightState = useState(null);
    const dropDownMenu = useRef(null);
    const [menuHeight, setMenuHeight] = menuHeightState;
    useEffect(() => {
        const menuComputedStyle = getComputedStyle(dropDownMenu.current)
        setMenuHeight(menuComputedStyle.height);
    }, [])
    return (
        <div ref={dropDownMenu} className='drop-down-menu' style={{ height: menuHeight }}>
            <TransitionableSubMenu
                activeMenuState={activeMenuState}
                menuHeightState={menuHeightState}
                menuId='main-menu'
                primary
                menuLabel='Main Menu'
                transitions={
                    [
                        { 'goToMenu': 'secondary-menu-1', 'label': 'Go to 1' },
                        { 'goToMenu': 'secondary-menu-2', 'label': 'Go to 2' }
                    ]
                }
            />
            <TransitionableSubMenu
                activeMenuState={activeMenuState}
                menuHeightState={menuHeightState}
                menuId='secondary-menu-1'
                menuLabel='Menu 1'
                transitions={
                    [
                        { 'goToMenu': 'main-menu', 'label': 'Back' }
                    ]
                }
            >
                <DropDownLinkItem>Regular Option</DropDownLinkItem>
                <DropDownLinkItem>Regular Option</DropDownLinkItem>
                <DropDownLinkItem>Regular Option</DropDownLinkItem>
                <DropDownLinkItem>Regular Option</DropDownLinkItem>
                <DropDownLinkItem>Regular Option</DropDownLinkItem>
                <DropDownLinkItem>Regular Option</DropDownLinkItem>
            </TransitionableSubMenu>
            <TransitionableSubMenu
                activeMenuState={activeMenuState}
                menuHeightState={menuHeightState}
                menuId='secondary-menu-2'
                menuLabel='Menu 2'
                transitions={
                    [
                        { 'goToMenu': 'main-menu', 'label': 'Back' }
                    ]
                }
            >

                <DropDownLinkItem>Regular Option</DropDownLinkItem>
                <DropDownLinkItem>Regular Option</DropDownLinkItem>
                <DropDownLinkItem>Regular Option</DropDownLinkItem>
            </TransitionableSubMenu>
        </div>
    );
}
