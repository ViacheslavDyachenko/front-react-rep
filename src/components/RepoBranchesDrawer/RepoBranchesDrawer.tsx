import { Drawer } from "antd"
import React from "react";
import { useParams } from "react-router-dom";
import { useReposContext } from "../../Pages/ReposSearchPage/ReposSearchPage";
import style from './RepoBranchesDrawer.module.scss';
import'antd/dist/antd.css';
import RepoBranchesStore from "../../store/RepoBranchesStore";
import useLocalStore from "../../utils/useLocalStore";

type RepoBranchesDrawerProps = {
    onClose: () => void,
    visible: true | false
}

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ onClose, visible}: RepoBranchesDrawerProps) => {

    const RepoContext = useReposContext();

    let [load, setLoad] = React.useState(false);

    const getData = useLocalStore(() => new RepoBranchesStore());

    const {title} = useParams();

    if(!visible && load) setLoad(false);

    React.useEffect(() => {
        if(!load){
            getData.repoBranches(RepoContext.branchData.owner, RepoContext.branchData.repo).then(() => setLoad(getData.load));
        }
    }, [load])
    

    return (
        <>
            {Boolean(visible) && 
            <Drawer title={`список веток репозитория: ${title}`} placement="right" onClose={onClose} visible={visible}>
                {load ? getData.branch.map(item => <p className={style.list_branch} key={item}>{item}</p>) : <p className={style.list_branch}>Загрузка</p>}
            </Drawer>}
        </>
    )
}
export default RepoBranchesDrawer;