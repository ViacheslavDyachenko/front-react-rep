import React, { createContext, useContext } from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input"
import RepoBranchesDrawer from "../../components/RepoBranchesDrawer";
import RepoTile from "../../components/RepoTile";
import SearchIcon from "../../components/SearchIcon";
import ReposListStore from "../../store/ReposListStore";
import style from './ReposSearchPage.module.scss';

const RepoContext = createContext({
    branchData: {owner: '', repo: ''},
    showTile: false,
    onChange: (event: React.FormEvent) => {}
  })

const Provider = RepoContext.Provider;

export const useReposContext = () => useContext(RepoContext);

const ReposSearchPage = () => {

    let [showTile, setShowTile] = React.useState(false);

    const getData = React.useRef<ReposListStore>(new ReposListStore());

    const [repoList, setRepoList] = React.useState([{
        src: "",
            owner: "",
            repo: "", 
            item: {
                title: "",
                company: "",
                counter_star: 0,
                last_update: ""}
    }]);

    const [value, setValue] = React.useState('');

    const [visible, setVisible] = React.useState(false);

    let [owner, setOwner] = React.useState('');
    let [repo, setRepo] = React.useState('');

    let [hasMore, setHasMore] = React.useState(true);

    const showDrawer = (event: React.MouseEvent) => {
        let elem = event.currentTarget as HTMLDivElement; 
        for(let item of getData.current.result) {
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
        getData.current.setValue(element.value);
        setValue(element.value);
    }

    const onClick = (): void => {
        setShowTile(true);
        getData.current.pageNum = 1;
        setHasMore(true);
        
    }
    React.useEffect(() => {
        if(showTile){
            getData.current.reposList().then(() => setRepoList(getData.current.result));
            setShowTile(false);
        }
    }, [showTile])

    const fetchData = () => {
        try {
            getData.current.reposList().then(() => {
                setRepoList(getData.current.result);           
                if(getData.current.result.length / 10 < getData.current.pageNum - 1) setHasMore(false);
            });
            
        } catch(e) {
            console.log(e);            
        }        
    }

    return (
        <>
            <Provider value={{branchData: {owner: owner, repo: repo}, showTile, onChange}}>
                <div className={style.search}>
                    <Input value={value} placeholder="Введите название организации" />
                    <Button children={<SearchIcon />} onClick={onClick} />
                </div>
                    {Boolean(repoList.length !== 1)
                    && <InfiniteScroll
                    className={style.repositories}
                    next={fetchData}
                    hasMore={hasMore}
                    dataLength={getData.current.result.length}
                    scrollThreshold={1}
                    loader={<h4>Загрузка</h4>}
                    endMessage={<h4>Отображены все репозитории</h4>}>
                        {Boolean(repoList.length !== 1)                      
                        && repoList.map((item) => <RepoTile src={item.src} key={item.item.title} item={item.item} onClick={showDrawer} />)}
                    </InfiniteScroll>}
                {Boolean(owner) && Boolean(repo) && <Link to='/repos'><RepoBranchesDrawer onClose={onClose} visible={visible}  /></Link> }
            </Provider>
        </>
    )
}

export default ReposSearchPage;