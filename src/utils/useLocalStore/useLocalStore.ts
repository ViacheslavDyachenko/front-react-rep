import React from "react";

const useLocalStore = <T>(creator: () => T): T => {
    const container = React.useRef<null | T>(null);
    if(container.current === null) {
        container.current = creator();
    }
    return container.current;
}
export default useLocalStore;