import { action, computed, flow, makeObservable, observable } from "mobx";
import { ILocalStore } from "../../utils/useLocalStore/useLocalStore";
import { GitHubStore } from "../GitHubStore/GitHubStore";

type PrivateFileds =  "_value" | "_showTile" | "_visible" | "_hasMore" | "_loadStatusError";

export default class ReposListStore implements ILocalStore{
    private _gitHubStore = new GitHubStore();
    private  _value: string = '';
    private _pageNum: number = 0;
    private _result: {
        src: string,
        owner: string,
        repo: string, 
        item: {
            title: string,
            company: string,
            counterStar: number,
            lastUpdate: string}
        }[] = [{
            src: "",
            owner: "",
            repo: "", 
            item: {
                title: "",
                company: "",
                counterStar: 0,
                lastUpdate: ""}
            }];
    private _showTile: boolean = false;
    private _visible: boolean = false;
    private _owner: string = '';
    private _repo: string = '';
    private _hasMore: boolean = true;
    private _loadStatusError: null | 'forbidden' | 'notFound' | 'BAD_STATUS' = null;
    
    constructor() {
        makeObservable<ReposListStore, PrivateFileds>(this, {
            _value: observable,
            _showTile: observable,
            _visible: observable,
            _hasMore: observable,
            _loadStatusError: observable,
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
            loadStatusError: computed
        })
    }

    get loadStatusError() {
        return this._loadStatusError;
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
        this.reposList();
        
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
                                                    counterStar: 0,
                                                    lastUpdate: ""}
                                                }];
        if(!this._result[0].item.title) this._result.shift();
        let response = yield this._gitHubStore.getOrganizationReposNextList({ organizationName: this._value }, this._pageNum);
        try {
            this._result = yield this._result.concat(response.data);
            this._showTile = false;
        } catch(e) {
            this._showTile = false;
        }

        if(response.status === 404) this._loadStatusError = 'notFound';
        if(response.status === 403) {
            this._result = [{
                src: "",
                owner: "",
                repo: "", 
                item: {
                    title: "",
                    company: "",
                    counterStar: 0,
                    lastUpdate: ""}
                }]
            this._loadStatusError = 'forbidden';
        };
        if(response.status === 'BAD_STATUS') this._loadStatusError = 'BAD_STATUS';
        if(response.status === 200) this._loadStatusError = null;
        this._pageNum++;
    });
    
    fetchData = async() => {
        if(this.result.length === 1) return;
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
                counterStar: 0,
                lastUpdate: ""}
            }];
        this._pageNum = 0;
        this._value = '';
        this._visible = false;
        this._owner = '';
        this._repo = '';
        this._hasMore = true;
    }
}