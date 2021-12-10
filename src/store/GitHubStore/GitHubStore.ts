import { HTTPMethod } from '../../shared/store/ApiStore/types';
import {ApiStore} from '../../shared/store/ApiStore/ApiStore';
import {ApiResp, GetOrganizationReposListParams, IGitHubStore} from "./types";

export class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore('https://api.github.com/orgs/{org}/repos');

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp> {
        let response = await this.apiStore.request({method: HTTPMethod.GET, endpoint: params.organizationName, headers: {}});
        return [response.success, response.status, response.data];
    }
}