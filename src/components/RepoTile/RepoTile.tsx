import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar"
import StarIcon from "../StarIcon/StarIcon"
import style from "./RepoTile.module.scss";

type RepoTileProps = {
    src?: string,
    alt?: string,
    owner?: string,
    repo?: string, 
    item: {
        title?: string,
        company?: string,
        counter_star?: number,
        last_update?: string
    },
    onClick: (event: React.MouseEvent) => void
}

const RepoTile: React.FC<RepoTileProps> = ({src, alt, item, onClick}: RepoTileProps) => {
    return (
        <Link to={`/repos/${item.title}`}>
            <div onClick={onClick} id={`${item.title}`} key={item.title} className={style.repositoty}>
                <Avatar src={src} alt={alt} />
                <div className={style.information_rep}>
                    <p className={style.title}>{item.title}</p>
                    <p className={style.company}>{item.company}</p>
                    <div className={style.details}>
                        <StarIcon />
                        <div className={style.counter_star}>{item.counter_star}</div>
                        <p className={style.last_update}>{item.last_update}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RepoTile;