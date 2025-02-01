import useFetch from "../context/hooks/usefetch";
import { useEffect, useState } from "react";
import * as Cons from "../constants";
import Loader from "../components/Loader";

function TeamCard( { team, showStatus = false } ){
    
    const players = team.players.map( ( p, ind ) => {
        return <p key={p.id} className="text-md md:text-lg"> Player {ind+1}: {p.name} {" "} ( {p.batch} ) </p>
    });

    return (
        <div className="card bg-gray-700 text-gray-200 w-80 "
            onClick={ ()=>{ /*toast("Let us know if you need information about it.", { toastId: "team_info"} ) */} }
            >
            <div className="card-body relative items-center text-center">
                { showStatus && <h1 className={ "absolute right-0 top-0 rounded-full text-sm px-2 py-1 text-black " + 
                    ( team.status === 'accepted' ? " bg-success" : ( team.status === 'pending' ? " bg-warning" : " bg-error") ) }
                    > {team.status || "unspecified" } </h1> }
                <h2 className="card-title text-success"> { team.name } </h2>
                {/* <h3 className="font-mono">{ team.number }</h3> */}
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
    const [ allGames, setAllGames ] = useState([]);
    const [ myRecentTeams, setMyRecentTeams ] = useState([]);
    // const [ error, setError ] = useState("");

    useEffect( ()=>{
        const myTeam = localStorage.getItem(Cons.MY_RECENT_TEAM);
        setIsLoading(true);
        api.getTeams()
        .then( res => res.json() )
        .then( data => {
            setAllTeams(data);
            setIsLoading(false);
            // console.log(data);
            // console.log(myTeam.split(","));
            if ( myTeam ){
                setMyRecentTeams(data.filter( team => {
                    // console.log(team.id);
                    return myTeam.split(',').includes( team.id + '' );
                }));
            }
        })
        .catch( err => {
            setIsLoading(false);
            alert(err);
        })

        api.getGames()
        .then( res => res.json() )
        .then( data => {
            setAllGames(data);
            setIsLoading(false);
        })
        .catch( err => {
            setIsLoading(false);
            alert(err);
        })

    }, []);

    // console.log(myRecentTeams);

    const teams = allTeams && allTeams.map( t =>  t.status === 'accepted' ? <TeamCard key={t.id} team={t}/> : null );

    const getTeamsOfGame = (game)=>{
        return game.teams.map( team =>{
            return (<TeamCard team={team} showStatus={true}/>);
        });
    }

    const getTeamsByGame = () => {
        return allGames.map( game => {
            return (
                <div className="flex flex-col justify-start mb-2 gap-1">
                    <h1>Game: {game.name} ({game.teams.length}) - <span className="text-success">{game.teams.filter(t => t.status === 'accepted').length}</span> / <span className="text-warning">{game.teams.filter(t => t.status !== 'accepted').length}</span> </h1>
                    <hr/>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2"> {getTeamsOfGame(game)} </div>
                    { game.teams.length === 0 && <h1 className=" text-zinc-300 ps-2 text-xs">No Teams Found For this game.</h1> }
                </div>
            );
        })
    }

    return (
        <div className="flex flex-col justify-center items-center gap-3 mb-10 text-gray-50">
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
                : ( allTeams && allTeams.filter(e => e.status=='accepted').length > 0 )
                ? <div className="flex flex-col md:w-full text-xl md:text-2xl gap-1">
                        <h1 className="text-white font-bold"> All Teams - ({ allTeams.filter(e=>e.status=='accepted').length}) </h1>
                        <p className="text-xs textarea-info"><span className="text-success">Green</span> means complete. And <span className="text-warning">Yellow</span> means Pending.</p>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-2 justify-center w-full mx-auto">
                            {/* { allTeams.filter(e => e.status=='accepted').length > 0 && teams } */}
                            { getTeamsByGame() }
                        </div>
                    </div>
                : <h1 className="text-lg text-white"> No Accepted Teams Found for now. </h1>
            }
        </div>
    );
}