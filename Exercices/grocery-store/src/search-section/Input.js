import { useEffect, useId, useRef } from 'react';

function Input({ onClick, placeholder, label, type }) {
    const ref = useRef(null);
    const id = useId();
    useEffect(
        () => {
            console.log("useing the effect")
            ref.current.addEventListener('click', () => {
                console.log("Firing the onClick event listener");
                onClick(ref.current)
            })
        },
        []
    );
    return (
        <div>
            <input ref={ref} id={id} type={type} placeholder={placeholder || ""} />
            {label && (
                <>
                    {' '}
                    <label for={id}>
                        {label}
                    </label>
                </>
            )}
        </div>
    );
}

export function TextInput({ onChange, placeholder }) {
    return (
        <Input onClick={(input_el) => onChange(input_el.value)} placeholder={placeholder} type="text" />
    );
}



export function ToggleInput({ onToggle, label }) {
    return (
        <Input onClick={(input_el) => onToggle(input_el.checked)} label={label} type="checkbox" />
    );
}