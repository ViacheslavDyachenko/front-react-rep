import React from "react";

export interface ILocalStore {
    destroy(): void;
}

const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
    const container = React.useRef<null | T>(null);
    if(container.current === null) {
        container.current = creator();
    }
    React.useEffect(() => {
        return () => {
            container.current?.destroy();
        }
    }, [])

    return container.current;
}
export default useLocalStore;