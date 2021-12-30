export type BranchesItemApi = {
    name: string
}

export type BranchesItemModel = {
    name: string
}

export const normalizeBranchesItem = (from: BranchesItemApi): BranchesItemModel => {
    return {name: from.name};
}