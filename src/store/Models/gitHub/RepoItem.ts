export type RepoItemApi = {
    src: string,
    owner: string,
    repo: string, 
    item: {
        title: string,
        company: string,
        counter_star: number,
        last_update: string}
}

export type RepoItemModel = {
    src: string,
    owner: string,
    repo: string, 
    item: {
        title: string,
        company: string,
        counterStar: number,
        lastUpdate: string}
}

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => {
    return {
        src: from.src,
    owner: from.owner,
    repo: from.repo, 
    item: {
        title: from.item.title,
        company: from.item.company,
        counterStar: from.item.counter_star,
        lastUpdate: from.item.last_update}
    }
}