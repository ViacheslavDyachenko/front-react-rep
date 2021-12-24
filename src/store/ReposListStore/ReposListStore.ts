import { GitHubStore } from "../GitHubStore/GitHubStore";

export default class ReposListStore {
    value: string = '';
    pageNum: number = 0;
    load: boolean = false;
    result: {
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
    setValue = (value: string) => {
        this.value = value;      
    };
    reposList = async() => {
        if(this.pageNum === 1) this.result = [{
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
            let promise = await new GitHubStore().getOrganizationReposNextList({ organizationName: this.value }, this.pageNum);
            if(!this.result[0].item.title) this.result.shift();
            this.result.push(...await promise[1].map((item: any) => {
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
        } catch(e) {
            console.log(e);            
        }
        this.result = this.result.slice();
        this.pageNum++;
    };
}