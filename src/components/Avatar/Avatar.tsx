import './Avatar.css';

type AvatarProps = {
    src?: string,
    alt?: string
}

const Avatar: React.FC<AvatarProps> = ({src, alt}: AvatarProps) => {
    return Boolean(src) ? <img className="avatar" src={src}/> : <span className="avatar">{alt}</span>
}

export default Avatar;