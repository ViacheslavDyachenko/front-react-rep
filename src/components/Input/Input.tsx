import { useReposContext } from '../../Pages/ReposSearchPage/ReposSearchPage';
import style from './Input.module.scss';

type InputProps = {
    value: string,
    placeholder: string,
}

const Input: React.FC<InputProps> = ({value, placeholder}: InputProps) => {    
    const RepoContext = useReposContext();
    return <input 
    type="text"
    className={style.search_input}
    value={value}
    placeholder={placeholder}
    onChange={RepoContext.onChange} />
}

export default Input;