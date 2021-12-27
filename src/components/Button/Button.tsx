import { Link } from 'react-router-dom';
import useReposListContext from '../../utils/useReposListContext';
import style from './Button.module.scss';

type ButtonProps = {
    children: React.ReactNode,
    onClick: (e: React.MouseEvent) => void,
}

const Button: React.FC<ButtonProps> = ({children, onClick}: ButtonProps) => {
    const {context} = useReposListContext();
    return (
        <Link to='/repos'>
            <button 
            className={style.search_btn}
            onClick={onClick}
            disabled={context.showTile}>
            {children}
            </button>
        </Link>
    )
}

export default Button;