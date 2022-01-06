import { action, computed, flow, makeObservable, observable } from "mobx";
import { ILocalStore } from "utils/useLocalStore/useLocalStore";
import { GitHubStore } from "store/GitHubStore/GitHubStore";

type PrivateFileds = "_load";

export default class RepoBranchesStore implements ILocalStore {
    private _branch: {name: string}[] = [{name: ''}];
    private _load: boolean = false;

    constructor() {
        makeObservable<RepoBranchesStore, PrivateFileds>(this, {
            _load: observable,
            repoBranches: action,
            destroy: action,
            load: computed,
        })
    }

    get branch() {
        return this._branch;
    }
    get load() {
        return this._load;
    }

    set load(prop) {
        this._load = prop;
    }
    repoBranches = flow(function*(this: RepoBranchesStore, ownerName: string, reposName: string) {
        try {
            if(!this._branch[0].name) this._branch.shift();
            let response = yield new GitHubStore().GetBranchList({ownerName: ownerName, reposName: reposName});
            this._branch = yield this._branch.concat(response.data);
            this._load = true;
        }
        catch(e) {
            this._branch = [{name: ''}];
            this._load = true;
        }
    })
    destroy(): void {        
        this._branch = [{name: ''}];
        this._load = false;
    }
}