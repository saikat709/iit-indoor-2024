import { useNavigate } from "react-router-dom";
import GamesList from "../components/GamesList";
import TopicIntro from "../components/TopicIntro";
import { NAVIGATION_SUFFIX_KEY } from "../constants";

export default function Home(){
    // const navigate = useNavigate();
    // const navigationSuffix = sessionStorage.getItem(NAVIGATION_SUFFIX_KEY);

    // if( navigationSuffix ){
    //     navigate(navigationSuffix);
    //     sessionStorage.removeItem(NAVIGATION_SUFFIX_KEY);
    // }

    return (
        <>
            <TopicIntro />
            <GamesList />
        </>
    );
}