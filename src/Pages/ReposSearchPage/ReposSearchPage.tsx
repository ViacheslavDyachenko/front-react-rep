import { observer } from "mobx-react-lite";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input"
import Loader from "../../components/Loader";
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

    const searchIcon = React.useMemo(() => {
        const componentSearchIcon = <SearchIcon />;
        return componentSearchIcon;
    }, [])

    const providerValue = React.useMemo(() => {
        const branchDataObj = {branchData: {owner: getData.owner, repo: getData.repo},
                                showTile: getData.showTile, 
                                onChange: getData.onChange};
        return branchDataObj;
    }, [getData.owner, getData.repo, getData.showTile, getData.onChange]);

    return (
        <>
            <Provider value={providerValue}>
                <div className={style.search}>
                    <Input value={getData.value} placeholder="Введите название организации" />
                    <Button children={searchIcon} onClick={getData.onClick} />
                </div>
                    {getData.loadStatusError === 'notFound' && <h4 className={style.error}>Вы ввели не существующую организацию</h4>}
                    {getData.loadStatusError === 'forbidden' && <h4 className={style.error}>Превышен лимит запросов, повторите попытку через время</h4>}
                    {getData.loadStatusError === 'BAD_STATUS' && <h4 className={style.error}>Что-то пошло не так, перезагрузите страницу</h4>}
                    {Boolean(getData.result.length !== 1)
                    && <InfiniteScroll
                    className={style.repositories}
                    next={getData.fetchData}
                    hasMore={getData.hasMore}
                    dataLength={getData.result.length}
                    scrollThreshold={1}
                    loader={<Loader />}>
                        {Boolean(getData.result.length !== 1)                      
                        && getData.result.map((item) => <RepoTile src={item.src} key={item.item.title} item={item.item} onClick={getData.showDrawer} />)}
                    </InfiniteScroll>}
                {Boolean(getData.visible) && <Link to='/repos'><RepoBranchesDrawer onClose={getData.onClose} visible={getData.visible}  /></Link> }
            </Provider>
        </>
    )
}

export default observer(ReposSearchPage);
