import React, { useEffect, useRef, useState } from 'react';

import { CSSTransition } from 'react-transition-group'

import { ReactComponent as RightChevron } from './icons/chevron-right.svg';
import { ReactComponent as LeftChevron } from './icons/chevron-left.svg';
import { ReactComponent as SettingsIcon } from './icons/cog-outline.svg';

function DropDownLinkItem({ href, onClick, leftIcon, rightIcon, children }) {
    return (
        <a href={href} className='drop-down-link-item button' onClick={onClick}>
            <span className='item-button'>{leftIcon}</span>
            {children}
            <span className='item-button drop-down-item-right-icon'>{rightIcon}</span>
        </a>
    );
}

function TransitionableSubMenu({ activeMenuState, menuHeightState, menuId, timeout, primary, menuLabel, transitions, children }) {
    const defaultTimeout = 500;
    // HELP:    Is this state propegation a good thing to do?
    //          It feels to me that very fast this aproach can end in lots of states being propegated
    //          through lots of layers of components.
    const [activeMenu, setActiveMenu] = activeMenuState;
    const [, setMenuHeight] = menuHeightState;

    function calculateHeight(htmlElement) {
        setMenuHeight(htmlElement.offsetHeight);
    }

    return (
        <CSSTransition
            in={activeMenu === menuId}
            unmountOnExit
            timeout={timeout || defaultTimeout}
            classNames={primary ? 'menu-primary' : 'menu-secondary'}
            onEnter={calculateHeight}
        >
            <div className='menu'>
                <h1>{menuLabel}</h1>
                {
                    transitions.map(
                        (transition, index) => <DropDownLinkItem key={index} leftIcon={transition.icon || <SettingsIcon />} rightIcon={primary ? <RightChevron /> : <LeftChevron />} onClick={() => setActiveMenu(transition.goToMenu)}>{transition.label}</DropDownLinkItem>
                    )
                }
                {children}
            </div>
        </CSSTransition>
    );
}

export function DropDownMenu() {
    const activeMenuState = useState('main-menu');
    const menuHeightState = useState(null);
    const dropDownMenu = useRef(null);
    const [menuHeight, setMenuHeight] = menuHeightState;
    // This useEffect is for the first transition
    useEffect(() => {
        const menuComputedStyle = getComputedStyle(dropDownMenu.current)
        setMenuHeight(menuComputedStyle.height);
    }, [setMenuHeight])
    // HELP: I failed to make the drop down list open with a transition (as if it was with height 0 and then opend).
    // HELP: I failed to create a closure that creates a TransitionableSubMenu with the 2 states.
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
                        { goToMenu: 'secondary-menu-1', label: 'Go to 1' },
                        { goToMenu: 'secondary-menu-2', label: 'Go to 2' }
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
                        { goToMenu: 'main-menu', label: 'Back' }
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
                        { goToMenu: 'main-menu', label: 'Back' }
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
