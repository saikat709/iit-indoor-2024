import { createContext } from "react";

const useAuth = createContext({
    isLoggedIn: true,
    setInLoggedIn: ()=>{},
});