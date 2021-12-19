import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar"
import StarIcon from "../StarIcon/StarIcon"
import "./RepoTile.css";

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
            <div onClick={onClick} id={`${item.title}`} key={item.title} className="repositoty">
                <Avatar src={src} alt={alt} />
                <div className="information_rep">
                    <p className="title">{item.title}</p>
                    <p className="company">{item.company}</p>
                    <div className="details">
                        <StarIcon />
                        <div className="counter_star">{item.counter_star}</div>
                        <p className="last_update">{item.last_update}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RepoTile;