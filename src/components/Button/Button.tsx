import './Button.css';

type ButtonProps = {
    children: React.ReactNode,
    onClick: (e: React.MouseEvent) => void,
    disabled: boolean
}

const Button: React.FC<ButtonProps> = ({children, onClick, disabled}: ButtonProps) => {
    return (
        <button 
        className="search_btn"
        onClick={onClick}
        disabled={disabled}>
            {children}
        </button>
    )
}

export default Button;