/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */

import { StatusHTTP } from "../RootStore/ApiStore/types";
import { BranchesItemModel } from "../Models/gitHub/BranchesItem";
import { RepoItemModel } from "../Models/gitHub/RepoItem";

export type GetOrganizationReposListParams = {
    organizationName: string
}

export type GetBranchListParams = {
    ownerName: string,
    reposName: string
}

export type ApiResp<RepoItemApi> =  {success: boolean,
                        data: RepoItemApi,
                        status: number | StatusHTTP.BAD_STATUS}

 export interface IGitHubStore {
    getOrganizationReposNextList(params: GetOrganizationReposListParams, page: number): Promise<ApiResp<RepoItemModel>>;
    GetBranchList(params: GetBranchListParams): Promise<ApiResp<BranchesItemModel>>;
}