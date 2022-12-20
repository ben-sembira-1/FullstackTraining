import { useEffect, useRef } from 'react';

function Input({ onChange, placeholder, label, type }) {
    const inputRef = useRef(null);
    useEffect(
        () => {
            inputRef.current.addEventListener('change', () => {
                onChange(inputRef.value)
            })
        },
        [inputRef, onChange]
    );
    return (
        <div>
            <input ref={inputRef} type={type} placeholder={placeholder || ""} />
            {label && (
                <>
                    {' '}
                    <label for={inputRef}>
                        {label}
                    </label>
                </>
            )}
        </div>
    );
}

export function TextInput({ onChange, placeholder }) {
    return (
        <Input onChange={onChange} placeholder={placeholder} type="text" />
    );
}



export function ToggleInput({ onChange, label }) {
    return (
        <Input onChange={onChange} label={label} type="checkbox" />
    );
}