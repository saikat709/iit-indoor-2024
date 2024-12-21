import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BasicLayout(){
    const curLocation = useLocation();
    return (
        <div className="flex min-h-screen justify-between items-center flex-col">
            <Header curPath={curLocation.pathname} />
            <div className="px-6 flex-1 mb-5 w-96 md:w-4/5 mt-4 md:mt-12"> 
                <Outlet />
            </div>
            <div className="flex-1"></div>
            <Footer />
        </div>
    );
}