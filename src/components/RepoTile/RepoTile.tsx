import Avatar from "../Avatar/Avatar"
import StarIcon from "../StarIcon/StarIcon"
import "./RepoTile.css";

type RepoTileProps = {
    item: {
        key?: number,
        title?: string,
        company?: string,
        counter_star?: number,
        last_update?: string
    },
    onClick: (e: React.MouseEvent) => void
}

const RepoTile: React.FC<RepoTileProps> = ({item, onClick}: RepoTileProps) => {
    return (
        <div key={item.key} className="repositoty">
            <Avatar alt='K' />
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
    )
}

export default RepoTile;