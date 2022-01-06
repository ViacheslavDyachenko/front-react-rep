import React from 'react';
import useReposListContext from 'utils/useReposListContext';
import style from './Input.module.scss';

type InputProps = {
    value: string,
    placeholder: string,
}

const Input: React.FC<InputProps> = ({value, placeholder}: InputProps) => { 
    const {context} = useReposListContext();
    
    return <input 
    type="text"
    className={style.search_input}
    value={value}
    placeholder={placeholder}
    onChange={context.onChange} />
}

export default React.memo(Input);