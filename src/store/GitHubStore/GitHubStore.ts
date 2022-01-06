import { ApiResponse, HTTPMethod } from 'store/RootStore/ApiStore/types';
import {ApiResp, GetOrganizationReposListParams, GetBranchListParams, IGitHubStore} from "./types";
import { normalizeRepoItem, RepoItemApi, RepoItemModel } from 'store/Models/gitHub/RepoItem';
import { BranchesItemApi, BranchesItemModel, normalizeBranchesItem } from 'store/Models/gitHub/BranchesItem';
import rootStore from '../RootStore';

export class GitHubStore implements IGitHubStore {
    private readonly apiStore = rootStore.apiStore;

    async getOrganizationReposNextList(params: GetOrganizationReposListParams, page: number): Promise<ApiResp<RepoItemModel>> {
        let response = await this.apiStore.request<ApiResponse<RepoItemApi, RepoItemApi>>({method: HTTPMethod.GET, endpoint: `/orgs/${params.organizationName}/repos?per_page=10&page=${page}`, headers: {}});
        try {
            response.data = await response.data.map((item: any) => {
                return normalizeRepoItem({
                    src: item.owner.avatar_url,
                    owner: item.owner.login,
                    repo: item.name,
                    item: {
                        title: item.name,
                        company: item.owner.login,
                        counter_star: item.watchers,
                        last_update: 'Updated ' + new Date(item.updated_at).getDay() + ' ' + new Date(item.updated_at).toLocaleString('en', { month: 'long' })
                    }
                });
            });
        } catch (e) {
            return {success: response.success, data: response.data, status: response.status};
        }
        
        return {success: response.success, data: response.data, status: response.status};
    }

    async GetBranchList(params: GetBranchListParams): Promise<ApiResp<BranchesItemModel>> {
        let response = await this.apiStore.request<ApiResponse<BranchesItemApi, BranchesItemApi>>({method: HTTPMethod.GET, endpoint: `/repos/${params.ownerName}/${params.reposName}/branches`, headers: {}});
        response.data = await response.data.map((item: any) => {
            return normalizeBranchesItem({name: item.name});
        });
        return {success: response.success, data: response.data, status: response.status};
    }
}