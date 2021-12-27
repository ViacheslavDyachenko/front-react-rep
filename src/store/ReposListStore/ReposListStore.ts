import { action, computed, flow, makeObservable, observable } from "mobx";
import { ILocalStore } from "../../utils/useLocalStore/useLocalStore";
import { GitHubStore } from "../GitHubStore/GitHubStore";

type PrivateFileds =  "_value" | "_showTile" | "_visible" | "_hasMore" ;

export default class ReposListStore implements ILocalStore{
    private  _value: string = '';
    private _pageNum: number = 0;
    private _result: {
        src: string,
        owner: string,
        repo: string, 
        item: {
            title: string,
            company: string,
            counter_star: number,
            last_update: string}
        }[] = [{
            src: "",
            owner: "",
            repo: "", 
            item: {
                title: "",
                company: "",
                counter_star: 0,
                last_update: ""}
            }];
    private _showTile: boolean = false;
    private _visible: boolean = false;
    private _owner: string = '';
    private _repo: string = '';
    private _hasMore: boolean = true;
    
    constructor() {
        makeObservable<ReposListStore, PrivateFileds>(this, {
            _value: observable,
            _showTile: observable,
            _visible: observable,
            _hasMore: observable,
            showDrawer: action,
            onClose: action,
            onChange: action,
            onClick: action,
            reposList: action,
            fetchData: action,
            destroy: action,
            value: computed,
            showTile: computed,
            visible: computed,
            hasMore: computed,
        })
    }

    get visible() {
        return this._visible;
    };

    get hasMore() {
        return this._hasMore;
    };

    get showTile() {
        return this._showTile;
    };

    get owner() {
        return this._owner;
    };
    get repo() {
        return this._repo;
    }

    get value() {
        return this._value;
    };
    get pageNum() {
        return this._pageNum;
    }
    set pageNum(prop) {
        this._pageNum = prop;
    }
    get result() {
        return this._result;
    }

    showDrawer = (event: React.MouseEvent) => {
        let elem = event.currentTarget as HTMLDivElement; 
        for(let item of this._result) {
            if(elem.id === item.item.title) {
                this._owner = item.owner;
                this._repo = item.item.title;
            }
        }
        this._visible = true;
    };

    onClose = () => {
        this._visible = false;
        
    };

    onChange = (event: React.FormEvent): void => {
        let element = event.target as HTMLInputElement;
        
        this._value = element.value;
    }

    onClick = (): void => {
        this._showTile = true;
        this._pageNum = 1;
        this._hasMore = true;
        
    }
    reposList = flow(function* (this: ReposListStore) {
        if (!this._showTile) return;
        if (this._pageNum === 1) this._result = [{
                                                src: "",
                                                owner: "",
                                                repo: "", 
                                                item: {
                                                    title: "",
                                                    company: "",
                                                    counter_star: 0,
                                                    last_update: ""}
                                                }];
        
        try {
            let promise = yield new GitHubStore().getOrganizationReposNextList({ organizationName: this._value }, this._pageNum);
            if(!this._result[0].item.title) this._result.shift();
            this._result.push(...yield promise[1].map((item: any) => {
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
            }));
            this._showTile = false;
        } catch(e) {
            console.log(e);            
        } 
        this._pageNum++;
    });
    
    fetchData = async() => {
        
        try {
            this._showTile = true;
            await this.reposList().then(action(() => {
                if(this._result.length / 10 < this._pageNum - 1) this._hasMore = false;
            }))
        } catch(e) {
            console.log(e);            
        }        
    }

    destroy(): void {
        this._result = [{
            src: "",
            owner: "",
            repo: "", 
            item: {
                title: "",
                company: "",
                counter_star: 0,
                last_update: ""}
            }];
        this._pageNum = 0;
        this._value = '';
        this._visible = false;
        this._owner = '';
        this._repo = '';
        this._hasMore = true;
    }
}