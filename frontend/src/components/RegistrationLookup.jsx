import { useEffect, useState } from "react";
import useFetch from "../context/hooks/usefetch";
import RegistrationCard from "./RegistrationCard";
import Loader from "./Loader";

export default function RegistrationLookUp(){
    const api = useFetch();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ allReg, setAllReg ] = useState([]);
    const [ allGames, setAllGames ] = useState([]);
    // const [ myRecentTeam, setMyRecentTeam ] = useState(null);

    useEffect( ()=>{
        setIsLoading(true);
        api.getRegistrations()
        .then( res => res.json() )
        .then( data => {
            setAllReg(data);
            setIsLoading(false);
            // console.log("Reg: ", data);
        })
        .catch( err => {
            alert(err);
            setIsLoading(false);
        })

        setIsLoading(true);
        api.getGames()
        .then( res => res.json() )
        .then( data => {
            setAllGames(data);
            setIsLoading(false);
            // console.log("Games: ", data);
        })
        .catch( err => {
            alert(err);
            setIsLoading(false);
        })
    }, []);

    const reg = allReg && allReg.map( reg => {
        // console.log(reg.status);
        const game = allGames.filter( g => g.id == reg.team.game )[0];
        console.log("game: ", game);
        return (reg.status === 'pending') 
            ? <RegistrationCard key={reg.id} 
                            reg={ reg } 
                            game={ game }
                            onAcceptOrRemove={ ()=>{
                                setAllReg(allReg.filter( el => el.id != reg.id ));
                            }} 
                    /> 
            : null 
    });

    
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-2'>
            { isLoading ? <div className="flex justify-center mt-3"><Loader/></div> : reg }
            {/* <h1 className="overflow-x-scroll">{ JSON.stringify(allReg)}</h1> */}
            { ( !isLoading && reg.filter( r => r ).length < 1 ) && <h1 className="text-white text-lg md:text-xl font-mono font-thin"> Nothing found for now. </h1> }
        </div>
    );
}
