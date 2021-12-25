import { GitHubStore } from "../GitHubStore/GitHubStore";

export default class RepoBranchesStore {
    branch: string[] = [''];
    load: boolean = false;
    repoBranches = async (ownerName: string, reposName: string) => {
        try {
            let promise = await new GitHubStore().GetBranchList({ownerName: ownerName, reposName: reposName});
            this.branch = await promise[1].map((item: any) => {
                return item.name;
            })
            this.load = true;
        }
        catch(e) {
            this.branch = [''];
            this.load = true;
        }
    }
}