import React from "react"
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input"
import RepoTile from "../../components/RepoTile";
import SearchIcon from "../../components/SearchIcon";
import { GitHubStore } from "../../store/GitHubStore/GitHubStore";
import './ReposSearchPage.css';

const ReposSearchPage = () => {
    let [value, setValue] = React.useState('');

    let [tile, setTile] = React.useState({});

    let [showTile, setShowTile] = React.useState(false);

    const getData = React.useRef([[{}]]);

    const onChange = (event: React.FormEvent): void => {
        let element = event.target as HTMLInputElement;
        setValue(element.value);
    }

    const onClick = (): void => {
        setShowTile(true)
        
    }
    React.useEffect(() => {
        
        if(showTile){
            setTile(async() => {
                try {
                    let pronise =  await new GitHubStore().getOrganizationReposList({organizationName: value})
                tile = await pronise[1].map((item: any) => {
                    return {key: item.id,
                            title: item.name,
                            company: item.owner.login,
                            counter_star: item.watchers,
                            last_update: 'Updated ' + new Date(item.updated_at).getDay() + ' ' + new Date(item.updated_at).toLocaleString('en', { month: 'long' })}
                })
                getData.current.length = 0;
                getData.current.push(Object.values(tile));
                setShowTile(false);
                }
                catch(e) {
                    tile = [{}];
                    getData.current.length = 0;
                    getData.current.push(Object.values(tile));
                    setShowTile(false);
                }
            })
        }
    }, [showTile])

    return (
        <>
            <div className="search">
                <Input value={value} placeholder="Введите название организации" onChange={onChange} />
                <Button children={<SearchIcon />} onClick={onClick} disabled={showTile} />
            </div>
            <div className="repositories">                              
                {Boolean(Object.keys(getData.current[0][0]).length) 
                && getData.current[0].map((item) => <RepoTile key={Number(Object.values(item)[0])} item={item} onClick={() => {}} />)}
            </div>
        </>
    )
}

export default ReposSearchPage;