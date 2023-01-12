import React, { FunctionComponent, useId } from 'react'

import './Input.css'

export enum InputType {
  PASSWORD = 'password',
  TEXT = 'text'
}

type InputProps = {
  label: string
  placeholder: string
  onChange: (s: string) => void
  value: string
  type: InputType
  className?: string
}

export const Input: FunctionComponent<InputProps> = (props) => {
  const id = useId()
  return (
    <>
      <label htmlFor={id}>
        {props.label}
      </label>
      <input
        className={props.className !== undefined ? props.className : ''}
        type={props.type}
        id={id}
        placeholder={props.placeholder}
        onChange={(element) => props.onChange(element.target.value)}
        value={props.value}
      />
    </>
  )
}
