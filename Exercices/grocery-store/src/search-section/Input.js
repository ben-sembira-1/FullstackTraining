import { useId, useRef } from 'react';

export function TextInput({ textState, placeholder }) {
    const [text, setText] = textState;
    const ref = useRef(null);
    return (
        <div>
            <input ref={ref} type="text" placeholder={placeholder || ""} onChange={() => setText(ref.current.value)} value={text} />
        </div>
    );
}



export function ToggleInput({ checkedState, label }) {
    const [checked, setChecked] = checkedState;
    const ref = useRef(null);
    const id = useId();
    return (
        <div>
            <input ref={ref} id={id} type="checkbox" onChange={() => setChecked(ref.current.checked)} />
            {' '}
            <label for={id}>
                {label}
            </label>
        </div>
    );
}