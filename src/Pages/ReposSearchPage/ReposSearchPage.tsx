import { observer } from "mobx-react-lite";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input"
import RepoBranchesDrawer from "../../components/RepoBranchesDrawer";
import RepoTile from "../../components/RepoTile";
import SearchIcon from "../../components/SearchIcon";
import ReposListStore from "../../store/ReposListStore";
import useLocalStore from "../../utils/useLocalStore";
import useReposListContext from "../../utils/useReposListContext";
import style from './ReposSearchPage.module.scss';

const ReposSearchPage = () => {
    const {Provider} = useReposListContext();

    const getData = useLocalStore(() => new ReposListStore());

    const showDrawer = (event: React.MouseEvent) => {        
        getData.showDrawer(event);
    };
    const onClose = () => getData.onClose();

    const onChange = (event: React.FormEvent): void => {
        getData.onChange(event);
    }

    const reposList = async() => getData.reposList();
    

    const onClick = (e: React.MouseEvent) => {
        getData.onClick();
        reposList();
    };

    const fetchData = getData.fetchData;
    return (
        <>
            <Provider value={{branchData: {owner: getData.owner, repo: getData.repo}, showTile: getData.showTile, onChange}}>
                <div className={style.search}>
                    <Input value={getData.value} placeholder="Введите название организации" />
                    <Button children={<SearchIcon />} onClick={onClick} />
                </div>
                    {Boolean(getData.result.length !== 1)
                    && <InfiniteScroll
                    className={style.repositories}
                    next={fetchData}
                    hasMore={getData.hasMore}
                    dataLength={getData.result.length}
                    scrollThreshold={1}
                    loader={<h4>Загрузка</h4>}
                    endMessage={<h4>Отображены все репозитории</h4>}>
                        {Boolean(getData.result.length !== 1)                      
                        && getData.result.map((item) => <RepoTile src={item.src} key={item.item.title} item={item.item} onClick={showDrawer} />)}
                    </InfiniteScroll>}
                {Boolean(getData.visible) && <Link to='/repos'><RepoBranchesDrawer onClose={onClose} visible={getData.visible}  /></Link> }
            </Provider>
        </>
    )
}

export default observer(ReposSearchPage);