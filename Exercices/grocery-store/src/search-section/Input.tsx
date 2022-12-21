import { useId } from 'react';

export function TextInput({ textState, placeholder }) {
    const [text, setText] = textState;
    return (
        <div>
            <input type="text" placeholder={placeholder || ""} onChange={(e) => setText(e.target.value)} value={text} />
        </div>
    );
}



export function ToggleInput({ checkedState, label }) {
    const [checked, setChecked] = checkedState;
    const id = useId();
    return (
        <div>
            <input id={id} type="checkbox" onChange={(e) => setChecked(e.target.checked)} checked={checked} />
            {' '}
            <label for={id}>
                {label}
            </label>
        </div>
    );
}
