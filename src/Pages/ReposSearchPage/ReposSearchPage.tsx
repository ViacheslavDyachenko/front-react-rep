import React from "react"
import { createThisTypeNode } from "typescript";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input"
import RepoBranchesDrawer from "../../components/RepoBranchesDrawer";
import RepoTile from "../../components/RepoTile";
import SearchIcon from "../../components/SearchIcon";
import { GitHubStore } from "../../store/GitHubStore/GitHubStore";
import './ReposSearchPage.css';

const ReposSearchPage = () => {
    let [value, setValue] = React.useState('');

    let [tile, setTile] = React.useState([{
                                            src: "",
                                            owner: "",
                                            repo: "", 
                                            item: {
                                                title: "",
                                                company: "",
                                                counter_star: 0,
                                                last_update: ""
                                            }
                                            }]);

    let [showTile, setShowTile] = React.useState(false);

    const getData = React.useRef([{
                                    src: "",
                                    owner: "",
                                    repo: "", 
                                    item: {
                                        title: "",
                                        company: "",
                                        counter_star: 0,
                                        last_update: ""}
                                    }]);

    const [visible, setVisible] = React.useState(false);

    let [owner, setOwner] = React.useState('');
    let [repo, setRepo] = React.useState('');

    const showDrawer = (event: React.MouseEvent) => {
        let elem = event.currentTarget as HTMLDivElement; 
        if(elem.className !== 'repositoty') return;
        for(let item of getData.current) {
            if(elem.id === item.item.title) {
                setOwner(owner = item.owner);
                setRepo(repo = item.item.title);
            }
        }

        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
        
    };

    const onChange = (event: React.FormEvent): void => {
        let element = event.target as HTMLInputElement;
        setValue(element.value);
    }

    const onClick = (): void => {
        setShowTile(true)
        
    }
    React.useEffect(() => {
        
        if(showTile){
            setTile((): { src: string; owner: string; repo: string;  item: { title: string; company: string; counter_star: number; last_update: string; }; }[] => {
                    (async () => {
                        try {
                        let promise = await new GitHubStore().getOrganizationReposList({ organizationName: value });
                        tile = await promise[1].map((item: any) => {
                            return {
                                src: item.owner.avatar_url,
                                owner: item.owner.login,
                                repo: item.name,
                                item: {
                                    title: item.name,
                                    company: item.owner.login,
                                    counter_star: item.watchers,
                                    last_update: 'Updated ' + new Date(item.updated_at).getDay() + ' ' + new Date(item.updated_at).toLocaleString('en', { month: 'long' })
                                }
                            };
                        });
                        getData.current.length = 0;
                        getData.current.push(...tile);
                        setShowTile(false);
                        
                    }
                    catch (e) {
                        tile = [{
                            src: "",
                            owner: "",
                            repo: "", 
                            item: {
                                title: "",
                                company: "",
                                counter_star: 0,
                                last_update: ""
                            }
                        }];
                        getData.current.length = 0;
                        getData.current.push(...tile);
                        setShowTile(false);
                    }
                    })();
                return tile;
            });
        }
    }, [showTile])

    return (
        <>
            <div className="search">
                <Input value={value} placeholder="Введите название организации" onChange={onChange} />
                <Button children={<SearchIcon />} onClick={onClick} disabled={showTile} />
            </div>
            <div className="repositories">                                        
                {Boolean(getData.current[0].item.title) 
                && getData.current.map((item) => <RepoTile src={item.src} key={item.item.title} item={item.item} onClick={showDrawer} />)}
            </div>
            {Boolean(owner) && Boolean(repo) && <RepoBranchesDrawer branchData={{owner: owner, repo: repo}} onClose={onClose} visible={visible}  /> }
        </>
    )
}

export default ReposSearchPage;