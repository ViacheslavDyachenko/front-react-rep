import './Input.css';

type InputProps = {
    value: string,
    placeholder: string,
    onChange: (event: React.FormEvent) => void
}

const Input: React.FC<InputProps> = ({value, placeholder, onChange}: InputProps) => {
    return <input 
    type="text"
    className="search_input"
    value={value}
    placeholder={placeholder}
    onChange={onChange} />
}

export default Input;