import React, { FunctionComponent, useId } from 'react'

export enum InputType {
  PASSWORD = 'password',
  TEXT = 'text'
}

type TextInputProps = {
  label: string
  placeholder: string
  onChange: (s: string) => void
  value: string
  type: InputType
}

export const Input: FunctionComponent<TextInputProps> = (props) => {
  const id = useId()
  return (
    <>
      <label htmlFor={id}>
        {props.label}
      </label>
      <input
        type={props.type}
        id={id}
        placeholder={props.placeholder}
        onChange={(element) => props.onChange(element.target.value)}
        value={props.value}
      />
    </>
  )
}
