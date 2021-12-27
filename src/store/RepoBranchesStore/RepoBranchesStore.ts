import { action, computed, flow, makeObservable, observable } from "mobx";
import { ILocalStore } from "../../utils/useLocalStore/useLocalStore";
import { GitHubStore } from "../GitHubStore/GitHubStore";

type PrivateFileds = "_load";

export default class RepoBranchesStore implements ILocalStore {
    private _branch: string[] = [''];
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
            let promise = yield new GitHubStore().GetBranchList({ownerName: ownerName, reposName: reposName});
            this._branch = yield promise[1].map((item: any) => {
                return item.name;
            })
            this._load = true;
        }
        catch(e) {
            this._branch = [''];
            this._load = true;
        }
    })
    destroy(): void {
        this._branch = [''];
        this._load = false;
    }
}