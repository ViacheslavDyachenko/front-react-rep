import React from "react";
import { Link } from "react-router-dom";
import Avatar from "components/Avatar"
import StarIcon from "components/StarIcon"
import style from "./RepoTile.module.scss";

type RepoTileProps = {
    src?: string,
    alt?: string,
    owner?: string,
    repo?: string, 
    item: {
        title?: string,
        company?: string,
        counterStar?: number,
        lastUpdate?: string
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
                        <div className={style.counter_star}>{item.counterStar}</div>
                        <p className={style.last_update}>{item.lastUpdate}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default React.memo(RepoTile);