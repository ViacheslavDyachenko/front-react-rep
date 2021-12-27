import { createContext, useContext } from "react";

const RepoContext = createContext({
    branchData: {owner: '', repo: ''},
    showTile: false,
    onChange: (event: React.FormEvent) => {}
  })

const useReposListContext = () => {
    
    const Provider = RepoContext.Provider;
    
    const useReposContext = () => useContext(RepoContext);

    const context = useReposContext();

    return {Provider, context};
}

export default useReposListContext;