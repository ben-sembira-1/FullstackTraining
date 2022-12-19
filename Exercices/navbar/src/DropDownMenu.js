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
        <div href={props.href} className='drop-down-link-item button'>
            <span className='drop-down-item-left-icon'>{props.leftIcon}</span>
            {props.children}
            <span className='drop-down-item-right-icon'>{props.rightIcon}</span>
        </div>
    );
}