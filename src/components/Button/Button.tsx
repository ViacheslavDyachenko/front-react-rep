import { Link } from 'react-router-dom';
import './Button.css';

type ButtonProps = {
    children: React.ReactNode,
    onClick: (e: React.MouseEvent) => void,
    disabled: boolean
}

const Button: React.FC<ButtonProps> = ({children, onClick, disabled}: ButtonProps) => {
    return (
        <Link to='/repos'>
            <button 
            className="search_btn"
            onClick={onClick}
            disabled={disabled}>
            {children}
            </button>
        </Link>
    )
}

export default Button;