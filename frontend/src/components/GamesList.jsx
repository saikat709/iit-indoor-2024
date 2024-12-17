import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../context/hooks/usefetch";
import Loader from "./Loader";

export default function GamesList(){
    const api = useFetch();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ games, setGames ] = useState(null);
    const [ error, setError ] = useState("");

    useEffect( () => {
        setIsLoading( true );
        api.getGames()
        .then(response => response.json())
        .then( data => {
            setIsLoading(false);
            setGames( data );
        })
        .catch((err) => {
            setIsLoading( false );
            setError("Could not get data. Check internet connection. ");
        });
    }, []);
    
    
    const gamesComp = games && games.map( (el) => {

        const verified_teams = el.teams.filter( t => t.status === 'accepted' );
        return (
            <div key={el.id} className="card bg-base-200 w-80 transition-all shadow-md hover:shadow-sm hover:shadow-amber-700 shadow-red-100 p-0 hover:bg-base-700 text-white m-3">
                <figure>
                    <img
                    src={ el.picture }
                    alt="Game name"
                    className="h-44 hover:h-52 object-cover transition-all pivot-center w-full border-b-2 border-slate-500" />
                </figure>
                <div className="card-body p-3 gap-1">
                    <div className="badge badge-secondary">
                        <span className="text-sm">{  el.player_count === 1 ? "Single Player" : el.player_count === 2 ? "Dual" : "Multi" }
                        </span>
                    </div>
                    <h2 className="card-title text-2xl text-primary py-0">
                        { el.name }
                    </h2>    
                    <p className="text-yellow-700 italic text-sm font-extralight font-mono">  { el.description } </p>
                    <div className="text-gray-500 bg-slate-400 w-2/4 h-px"></div>
                    <p className='flex gap-1'>
                        { el.entry_fee > 0 ?
                            <>
                                <span>Entry free: </span>
                                <span className="font-bold text-green-500"> { el.entry_fee } </span>
                                <span className="w-6 h-6 text-gray-300"> BDT </span>
                            </> :
                            <>
                                <span className="text-green-600 font-bold">Free registration</span>
                            </>
                        }
                    </p>
                    <p className="text-white font-bold">
                        Registrations: <span className="text-success">{ verified_teams.length  }</span>
                    </p>
                    {/* || <h1 className="text-sm text-error">teams attr not found</h1> */}
                    <div className="text-gray-500 bg-slate-400 w-2/4 h-px"></div>
                    <div className="card-actions justify-end">
                       {/* { verified_teams.length < el.total_team 
                            ? <Link to={`/register/${el.id}`} 
                                    className="btn btn-outline hover:bg-blue-700 hover:border-none hover:text-white"
                                > Register </Link>
                            : <button className="btn btn-success mt-2 px-5 btn-sm">Teams complete.</button>
                       } */}
                       <Link to={`/register/${el.id}`} 
                            className="btn btn-primary hover:bg-blue-700 hover:border-none hover:text-white"
                        > Register </Link>
                    </div>
                </div>
            </div>
        );
    } );

    return (<>
        { isLoading ? <div className="flex justify-center mt-4"> <Loader/> </div>
        :  error !== "" ? <h1 className="text-error font-mono font-bio"> {error} </h1>
            : <div className="flex justify-center items-center flex-wrap m-1 md:m-6 p-1 md:p-2 mt-6 md:mt-10 mb-5">
                { gamesComp }
            </div>
        }
    </>);
}