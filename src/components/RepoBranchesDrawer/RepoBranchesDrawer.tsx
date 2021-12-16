import { Drawer } from "antd"
import React from "react";
import { GitHubStore } from "../../store/GitHubStore/GitHubStore";

type RepoBranchesDrawerProps = {
    branchData: {
        owner: string,
        repo: string
    },
    onClose: () => void,
    visible: true | false
}

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({branchData, onClose, visible}: RepoBranchesDrawerProps) => {

    let [branch, setBranch] = React.useState(['']);

    let [load, setLoad] = React.useState(false);

    const getData = React.useRef(['']);

    if(!visible && load) setLoad(false);

    React.useEffect(() => {
        if(!load){
            setBranch((): string[] => {
                (async() => {
                    try {
                        let promise = await new GitHubStore().GetBranchList({ownerName: branchData.owner, reposName: branchData.repo});
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
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
                {load ? getData.current.map(item => <p key={item}>{item}</p>) : <p>Загрузка</p>}
            </Drawer>}
        </>
    )
}
export default RepoBranchesDrawer;