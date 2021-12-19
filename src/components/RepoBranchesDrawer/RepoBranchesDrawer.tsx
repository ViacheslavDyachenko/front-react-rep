import { Drawer } from "antd"
import React from "react";
import { useParams } from "react-router-dom";
import { useReposContext } from "../../Pages/ReposSearchPage/ReposSearchPage";
import { GitHubStore } from "../../store/GitHubStore/GitHubStore";
import style from './RepoBranchesDrawer.module.scss';
import'antd/dist/antd.css';

type RepoBranchesDrawerProps = {
    onClose: () => void,
    visible: true | false
}

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ onClose, visible}: RepoBranchesDrawerProps) => {

    const RepoContext = useReposContext();

    let [branch, setBranch] = React.useState(['']);

    let [load, setLoad] = React.useState(false);

    const getData = React.useRef(['']);

    const {title} = useParams();

    if(!visible && load) setLoad(false);

    React.useEffect(() => {
        if(!load){
            setBranch((): string[] => {
                (async() => {
                    try {
                        let promise = await new GitHubStore().GetBranchList({ownerName: RepoContext.branchData.owner, reposName: RepoContext.branchData.repo});
                        branch = await promise[1].map((item: any) => {
                            return item.name;
                        })
                        getData.current.length = 0;
                        getData.current.push(...branch);
                        setLoad(true);
                    }
                    catch(e) {
                        branch = [''];
                        getData.current.length = 0;
                        getData.current.push(...branch);
                        setLoad(true);
                    }
                })();
                return branch;
            })
        }
    }, [load])
    

    return (
        <>
            {Boolean(visible) && 
            <Drawer title={`список веток репозитория: ${title}`} placement="right" onClose={onClose} visible={visible}>
                {load ? getData.current.map(item => <p className={style.list_branch} key={item}>{item}</p>) : <p className={style.list_branch}>Загрузка</p>}
            </Drawer>}
        </>
    )
}
export default RepoBranchesDrawer;