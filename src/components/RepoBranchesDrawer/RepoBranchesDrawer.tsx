import { Drawer } from "antd"
import React from "react";
import { useParams } from "react-router-dom";
import style from './RepoBranchesDrawer.module.scss';
import'antd/dist/antd.css';
import RepoBranchesStore from "store/RepoBranchesStore";
import useLocalStore from "utils/useLocalStore";
import useReposListContext from "utils/useReposListContext";
import { observer } from "mobx-react-lite";
import Loader from "components/Loader";

type RepoBranchesDrawerProps = {
    onClose: () => void,
    visible: true | false
}

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ onClose, visible}: RepoBranchesDrawerProps) => {
    const {context} = useReposListContext();

    const getData = useLocalStore(() => new RepoBranchesStore());

    const {title} = useParams();

    if(!visible && getData.load) getData.load = false;

    if(!getData.load){
        getData.repoBranches(context.branchData.owner, context.branchData.repo);
    }
    

    return (
        <>
            {Boolean(visible) && 
            <Drawer title={`список веток репозитория: ${title}`} placement="right" onClose={onClose} visible={visible}>
                {getData.load ? getData.branch.map(item => <p className={style.list_branch} key={item.name}>{item.name}</p>) : <Loader />}
            </Drawer>}
        </>
    )
}
export default React.memo(observer(RepoBranchesDrawer));