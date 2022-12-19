import React, { useState } from 'react';

import { CSSTransition } from 'react-transition-group'

import { ReactComponent as RightChevron } from './icons/chevron-right.svg';
import { ReactComponent as LeftChevron } from './icons/chevron-left.svg';
import { ReactComponent as SettingsIcon } from './icons/cog-outline.svg';

function DropDownLinkItem(props) {
    return (
        <a href={props.href} className='drop-down-link-item ' onClick={props.onClick}>
            <span className='item-button'>{props.leftIcon}</span>
            {props.children}
            <span className='item-button drop-down-item-right-icon'>{props.rightIcon}</span>
        </a>
    );
}

function TransitionableSubMenu(props) {
    const [activeMenu, setActiveMenu] = props.activeMenuState
    return (
        <CSSTransition
            in={activeMenu === props.menuId}
            unmountOnExit
            timeout={props.timeout || 500}
            classNames={props.primary ? 'menu-primary' : 'menu-secondary'}
        >
            <div className='menu'>
                <h1>{props.menuLabel}</h1>
                {
                    props.transitions.map(
                        (transition, index) => <DropDownLinkItem key={index} leftIcon={transition.icon || <SettingsIcon />} rightIcon={props.primary ? <RightChevron /> : <LeftChevron />} onClick={() => setActiveMenu(transition.goToMenu)}>{transition.label}</DropDownLinkItem>
                    )
                }
            </div>
        </CSSTransition>
    );
}

export function DropDownMenu(props) {
    const activeMenuState = useState('main-menu');
    return (
        <div className='drop-down-menu'>
            <TransitionableSubMenu
                activeMenuState={activeMenuState}
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
                menuId='secondary-menu-1'
                menuLabel='Menu 1'
                transitions={
                    [
                        { 'goToMenu': 'main-menu', 'label': 'Back' }
                    ]
                }
            />
            <TransitionableSubMenu
                activeMenuState={activeMenuState}
                menuId='secondary-menu-2'
                menuLabel='Menu 2'
                transitions={
                    [
                        { 'goToMenu': 'main-menu', 'label': 'Back' }
                    ]
                }
            />
        </div>
    );
}
