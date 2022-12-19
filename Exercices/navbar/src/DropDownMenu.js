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

    return (
        <div className='drop-down-menu'>
            <CSSTransition
                in={activeMenu === 'main-menu'}
                unmountOnExit
                timeout={500}
                classNames='menu-primary'
            >
                <div className='menu'>
                    <h1>Main menu</h1>
                    <DropDownLinkItem leftIcon={<SettingsIcon />} rightIcon={<RightChevron />} goToMenu='secondary-menu-1'>go to 1</DropDownLinkItem>
                    <DropDownLinkItem leftIcon={<SettingsIcon />} rightIcon={<RightChevron />} goToMenu='secondary-menu-2'>go to 2</DropDownLinkItem>
                </div>
            </CSSTransition>
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
