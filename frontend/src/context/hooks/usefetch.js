import { createContext, useContext } from "react";
import useProvideFetch from "../providers/useProvidefetch";

const fecthContext = createContext("");


export function FecthProvider({ children }){
    const provideFetch = useProvideFetch();
    return  <fecthContext.Provider value={provideFetch}> { children } </fecthContext.Provider>;
}

const useFetch = () => {
    return useContext( fecthContext );
}

export default useFetch;