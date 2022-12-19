import React, { useState } from 'react';

import { CSSTransition } from 'react-transition-group'

import { ReactComponent as RightChevron } from './icons/chevron-right.svg';
import { ReactComponent as LeftChevron } from './icons/chevron-left.svg';
import { ReactComponent as SettingsIcon } from './icons/cog-outline.svg';

export function DropDownMenu(props) {

    const [activeMenu, setActiveMenu] = useState('main-menu');


    function DropDownLinkItem(props) {
        return (
            <a href={props.href} className='drop-down-link-item ' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className='item-button'>{props.leftIcon}</span>
                {props.children}
                <span className='item-button drop-down-item-right-icon'>{props.rightIcon}</span>
            </a>
        );
    }

    function TransitionableSubMenu(props) {
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
                            (transition, index) => <DropDownLinkItem leftIcon={transition.icon || <SettingsIcon />} rightIcon={props.primary ? <RightChevron /> : <LeftChevron />} goToMenu={transition.goToMenu}>{transition.label}</DropDownLinkItem>
                        )
                    }
                </div>
            </CSSTransition>
        );
    }

    return (
        <div className='drop-down-menu'>
            <TransitionableSubMenu
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

            <CSSTransition
                in={activeMenu === 'secondary-menu-1'}
                unmountOnExit
                timeout={500}
                classNames='menu-secondary'
            >
                <div className='menu'>
                    <h2>Menu 1</h2>
                    <DropDownLinkItem leftIcon={<SettingsIcon />} rightIcon={<LeftChevron />} goToMenu='main-menu'>back</DropDownLinkItem>
                    <DropDownLinkItem leftIcon={<SettingsIcon />} >Dont press this</DropDownLinkItem>
                </div>
            </CSSTransition>
            <CSSTransition
                in={activeMenu === 'secondary-menu-2'}
                unmountOnExit
                timeout={500}
                classNames='menu-secondary'
            >
                <div className='menu'>
                    <h2>Menu 2</h2>
                    <DropDownLinkItem leftIcon={<SettingsIcon />} rightIcon={<LeftChevron />} goToMenu='main-menu'>back</DropDownLinkItem>
                    <DropDownLinkItem leftIcon={<SettingsIcon />} >Good option</DropDownLinkItem>
                    <DropDownLinkItem leftIcon={<SettingsIcon />} >Another good option</DropDownLinkItem>
                </div>
            </CSSTransition>
        </div>
    );
}
