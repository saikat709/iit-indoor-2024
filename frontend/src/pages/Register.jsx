import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamName from "../components/TeamName";
import TeamPlayers from "../components/TeamPlayers";
import TeamEmail from "../components/TeamEmail";
import Payment from "../components/Payment";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import useFetch from "../context/hooks/usefetch";
import { MY_RECENT_TEAM } from "../constants";

/* <Navigate to={"/registration-complete"} replace state= {{fromLink: true}}>Teams screen</Navigate> */
// useNavigation().navigate("/", { state: { fromLink: true } } )

export default function Register(){
    const api = useFetch();
    const params = useParams();
    const navigate = useNavigate();

    const [ curStep, setCurStep ] = useState(1);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ formData, setFormData ] = useState({});
    const [ err, setErr ] = useState( null );

    const [ info, setInfo ] = useState({
        playerCount: 0,
        gameName: "",
        entryFee: "",
        gamePicture: "",
    });

    useEffect( ()=>{
        setFormData({
            name: "",
            players: [],
            email: "",
            transaction_id: "",
            game_id: params.id,
        });
    }, []);

    useEffect( () => {
        toast("Refresh will cost you rewrite everything.", { toastId: "refresh_msg" } );
        setIsLoading(true);
        // fetch call using params.id
        // extract infos for Game of id
        api.getGame( params.id )
        .then( res => res.json() )
        .then( data => {
            setIsLoading(false);
            setInfo({
                playerCount: data.player_count,
                gameName: data.name,
                entryFee: data.entryFee,
                gamePicture: data.picture,  
            });
        })
        .catch( err => {
            setIsLoading(false);
            alert(err);
        });
    }, [ ] );


    // const id = params.id;
    // console.log(params.type);

    // useEffect( ()=>{
    //     console.log( "FormData: ", formData );
    // }, [ formData ] );


    const handleFormSubmition = async () => {
        setIsLoading(true);

        api.register( formData )
            .then( res => res.json() )
            .then( data => {
                setIsLoading( false );
                // console.log( data );
                // console.log( data.id )
                const prevRecentTeamData = localStorage.getItem(MY_RECENT_TEAM);
                localStorage.setItem(MY_RECENT_TEAM, prevRecentTeamData ? prevRecentTeamData + ',' + data.id : data.id );
                navigate( "/registration-complete", 
                    { 
                        replace : true, 
                        state : { 
                            fromLink: true 
                        }
                    } 
                );
            })
            .catch( err => {
                setIsLoading( false );
                setErr(err);
            });

    };



    const content = (
        <div className="card m-4 mt-16 md:mt-10 w- md:m-6 flex justify-center items-center bg-slate-100">
            <div className="flex justify-center">
                <figure className="hidden md:block">
                    <img
                    className="hidden md:block object-fit w-64 h-full hover:w-80 transition-all duration-1000 flex-1 rounded-bl-lg rounded-tl-lg"
                    src={ info.gamePicture }
                    alt={ info.gameName } />
                </figure>
                <div className="card-body flex-1 p-3 md:p-1 w-4/5 md:w-3/5 flex justify-start">
                    <h2 className="card-title text-black">Register for: <span className="font-bold text-yellow-800"> { info.gameName } </span> </h2>
                    <h2 className="card-title text-black">Entry fee: <span className="font-bold text-green-600"> { info.entryFee } </span> </h2>
                    <hr/>
                    
                    <div className="flex flex-row gap-2 md:justify-start justify-center">
                        <ul className="steps steps-vertical">
                            <li className={ "step "+ ( curStep>=1 ? "step-primary" : "" ) }></li>
                            <li className={ "step "+ ( curStep>=2 ? "step-primary" : "" ) }></li>
                            <li className={ "step "+ ( curStep>=3 ? "step-primary" : "" ) }></li>
                            <li className={ "step "+ ( curStep>=4 ? "step-primary" : "" ) }></li>
                        </ul>

                        <div className="py-2 flex flex-col gap-1 w-60 md:w-72">
                            { curStep === 5 && <div className="flex flex-col justify-center gap-3 items-center">
                                    <h1 className="text-green-600 font-bold text-lg"> All steps complete. </h1>
                                    <button className="btn btn-primary p-3"
                                            disabled={ isLoading }
                                            onClick= { handleFormSubmition }
                                    > { isLoading ? <Loader /> : "Finish Registration" } </button>
                                </div>
                            }   
                            { curStep===1 && <TeamPlayers 
                                onNext={ ( players )=>{
                                    // console.log(players);
                                    setFormData({...formData, players: [ ...players ] });
                                    setCurStep(2);
                                } } 
                                playerCount = { info.playerCount } 
                                /> 
                            }
                            { curStep===2 && 
                                <TeamName 
                                    onNext={ (teamName)=>{
                                        setFormData( { ...formData, name: teamName } );
                                        setCurStep(3);
                                    } } 
                                    playerName={ formData.players[0].name /* info.playerCount > 1 ? " " : formData.players[0].name */}
                                /> 
                            }
                            { curStep===3 && 
                                <TeamEmail 
                                    emails={ formData.players.map( p => p.email ) } 
                                    onNext={ (email)=>{ 
                                        // console.log(email);
                                        setFormData( {...formData, email: email } );
                                        setCurStep(4); 
                                    } }
                                /> 
                            }
                            { curStep===4 && <Payment 
                                    onNext={ (tranId)=>{ 
                                        setFormData({...formData, transaction_id: tranId });
                                        setCurStep(5); 
                                    } }
                                    isLoading={ isLoading }

                                    /> 
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex justify-center items-center flex-col">
            <div className="flex justify-center items-center  w-4/5 md:w-3/5 h-96">
                { isLoading ?  <Loader/> : content }
            </div>
            { err && <h1 className="text-error font-mono font-bold text-lg mt-5"> { err.toString() } </h1>}
        </div>
    );
}