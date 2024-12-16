import useFetch from "../context/hooks/usefetch";
import { useEffect, useState } from "react";
import * as Cons from "../constants";
import Loader from "../components/Loader";

function TeamCard({team, showStatus = false}){
    
    const players = team.players.map( ( p, ind ) => {
        return <p key={p.id} className="text-md md:text-lg"> Player {ind+1}: {p.name} {" "} ( {p.batch} ) </p>
    });

    return (
        <div className="card bg-neutral text-neutral-content w-80 "
            onClick={ ()=>{ /*toast("Let us know if you need information about it.", { toastId: "team_info"} ) */} }
        >
            <div className="card-body relative items-center text-center">
                { showStatus && <h1 className={ "absolute right-0 top-0 rounded-full text-sm px-2 py-1 text-black " + 
                                ( team.status === 'accepted' ? " bg-success" : ( team.status === 'pending' ? " bg-warning" : " bg-error") ) }
                                > {team.status || "unspecified" } </h1> }
                <h2 className="card-title text-success"> { team.name } </h2>
                <h3 className="font-mono">{ team.team_email }</h3>
                <hr className="w-3/4"/>
                { players }
                <button className="bg-amber-300/90 relative mt-4 px-10 py-1 font-mono text-md md:text-lg text-black rounded-3xl"> 
                    { team.game_name }  <p className="badge absolute -top-2 -right-6 bg-slate-300 border-none text-black"> { team.game_type }</p>
                </button>
                
            </div>
        </div>
    );
}


export default function Teams(){
    const api = useFetch();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ allTeams, setAllTeams ] = useState([]);
    const [ myRecentTeams, setMyRecentTeams ] = useState([]);
    // const [ error, setError ] = useState("");

    useEffect( ()=>{
        const myTeam = localStorage.getItem(Cons.MY_RECENT_TEAM);

        api.getTeams()
        .then( res => res.json() )
        .then( data => {
            setAllTeams(data.results);
            // console.log(data.results);
            // console.log(myTeam.split(","));
            if ( myTeam ){
                setMyRecentTeams(data.results.filter( team => {
                    // console.log(team.id);
                    return myTeam.split(',').includes( team.id + '' );
                }));
            }
        })
        .catch( err => {
            setIsLoading(false);
            alert(err);
        })

    }, []);

    // console.log(myRecentTeams);


    const teams = allTeams && allTeams.map( t =>  t.status === 'accepted' ? <TeamCard key={t.id} team={t}/> : null );

    return (
        <div className="flex flex-col justify-center items-center gap-3 mb-10">
            <h1 className="text-2xl md:text-3xl text-primary font-extrabold"> Registered Teams </h1>

            { myRecentTeams.length > 0 && <div className="flex flex-col md:w-full flex-wrap text-xl md:text-2xl gap-1 mb-2">
                <h1 className="text-white font-bold"> Your Recent Team{myRecentTeams.length>1 && "s"} -  </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-center w-full mx-auto">
                    { myRecentTeams.map( team => <TeamCard key={team.id} team={team} showStatus={true} /> ) }
                </div>
            </div>
            }
                
            { isLoading 
             ? <div className="flex justify-center items-center w-full">
                    <Loader/>
                </div>
             : <div className="flex flex-col md:w-full text-xl md:text-2xl gap-1">
                    <h1 className="text-white font-bold"> All Accepted Teams -  </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-center w-full mx-auto">
                        { allTeams.length > 0 && teams }
                    </div>
                </div>
            }
        </div>
    );
}