import { Link } from 'react-router-dom';
import { useReposContext } from '../../Pages/ReposSearchPage/ReposSearchPage';
import style from './Button.module.scss';

type ButtonProps = {
    children: React.ReactNode,
    onClick: (e: React.MouseEvent) => void,
}

const Button: React.FC<ButtonProps> = ({children, onClick}: ButtonProps) => {
    const RepoContext = useReposContext();
    return (
        <Link to='/repos'>
            <button 
            className={style.search_btn}
            onClick={onClick}
            disabled={RepoContext.showTile}>
            {children}
            </button>
        </Link>
    )
}

export default Button;