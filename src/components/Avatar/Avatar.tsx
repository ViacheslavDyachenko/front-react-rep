import style from './Avatar.module.scss';

type AvatarProps = {
    src?: string,
    alt?: string
}

const Avatar: React.FC<AvatarProps> = ({src, alt}: AvatarProps) => {
    return Boolean(src) ? <img className={style.avatar} src={src} alt=''/> : <span className={style.avatar}>{alt}</span>
}

export default Avatar;