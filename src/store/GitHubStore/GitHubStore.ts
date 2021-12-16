import { HTTPMethod } from '../../shared/store/ApiStore/types';
import {ApiStore} from '../../shared/store/ApiStore/ApiStore';
import {ApiResp, GetOrganizationReposListParams, GetBranchListParams, IGitHubStore} from "./types";

export class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore('https://api.github.com');

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp> {
        let response = await this.apiStore.request({method: HTTPMethod.GET, endpoint: `/orgs/${params.organizationName}/repos`, headers: {}});
        return [response.success, response.data, response.status];
    }
    async GetBranchList(params: GetBranchListParams): Promise<ApiResp> {
        let response = await this.apiStore.request({method: HTTPMethod.GET, endpoint: `/repos/${params.ownerName}/${params.reposName}/branches`, headers: {}});
        return [response.success, response.data, response.status];
    }
}