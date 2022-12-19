import React from 'react';

export function DropDownMenu(props) {
    return (
        <div className='drop-down-menu'>
            {props.children}
        </div>
    );
}

export function DropDownLinkItem(props) {
    return (
        <a href={props.href} className='drop-down-link-item button'>
            <span className='item-button'>{props.leftIcon}</span>
            {props.children}
            <span className='item-button drop-down-item-right-icon'>{props.rightIcon}</span>
        </a>
    );
}