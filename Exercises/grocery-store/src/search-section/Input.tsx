import React, { FC, useId } from 'react'

type TextInputProps = {
  value: string
  onValueChange: (newValue: string) => void
  placeholder?: string
}

export const TextInput: FC<TextInputProps> = (props) => {
  return (
    <div>
      <input
        type="text"
        placeholder={props.placeholder !== undefined ? props.placeholder : ''}
        onChange={(event) => props.onValueChange(event.target.value)}
        value={props.value} />
    </div>
  )
}

type ToggleInputProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: string
}

export const ToggleInput: FC<ToggleInputProps> = (props) => {
  const id = useId()
  return (
    <div>
      <input id={id} type="checkbox" onChange={(event) => props.onCheckedChange(event.target.checked)} checked={props.checked} />
      {' '}
      <label htmlFor={id}>
        {props.label}
      </label>
    </div>
  )
}
