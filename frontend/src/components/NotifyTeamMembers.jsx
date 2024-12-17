import { useState } from "react";
import useFetch from "../context/hooks/usefetch";
import Loader from "./Loader";
import { toast } from "react-toastify";


export default function NotifyTeamMembers({ games } ){
    const api = useFetch();
    const [ toAll, setToAll ] = useState(false);
    const [ isForGame, setIsforGame ] = useState(false);
    const [ selectedGame, setSelectedGame ] = useState({});
    const [ isLoading, setIsLoading ] = useState(false);
    const [ message, setMessage ] = useState("");

    const options = games && games.map( game => {
        return ( <option onClick={ e => {
                        setSelectedGame(game);
                    }} 
                    key={ game.id }
                    className="text-lg"
                    value={game.id}
                > { game.name } </option> 
            );
    });

    const collectMails = ()=>{
        let mails = [];
        let teams = selectedGame.teams;
        if( isForGame ){
            if ( toAll ){
                teams.map( team => {
                    if ( team.status === 'accepted' ){
                        team.players.map( player => {
                            mails.push( player.email );
                            return null;
                        });
                    }
                    return null;
                });
            } else {
                teams.map( team => {
                    if ( team.status === 'accepted' ){
                        mails.push(team.team_email);
                    }
                    return null;
                });
            }
        } else {
            if ( toAll ){
                games.map( game => {
                    game.teams.map( team => {
                        if ( team.status === 'accepted' ){
                            team.players.map( p => {
                                mails.push(p.email);
                                return null;
                            });
                        }
                        return null;
                    });
                    return null;
                })
            } else {
                games.map( game => {
                    game.teams.map( team => {
                        if ( team.status === 'accepted' ){
                            mails.push( team.team_email );
                        }
                        return null;
                    });
                    return null;
                })
            }
        }
        return mails;
    }

    const notifyRegisteredMembers = ()=>{

        const mails = collectMails();
        const subject = "IIT Indoor Notification"

        setIsLoading(true);

        api.sendMail(message, mails, subject)
        .then((result) => {
            setIsLoading(false);
            document.getElementById('modal_notify').close();
            toast("Mails have been sent.");
        }).catch((err) => {
            setIsLoading(false);
            alert(err);
        });
    }


    const dialog = (
        <dialog id="modal_notify" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Notifying teams via Email</h3>
                <hr className='text-white mb-2'></hr>
                
                <div className="form-control gap-0">
                    <label className="label cursor-pointer pb-1 mb-0">
                        <span className="text-lg">Only to team Email</span>
                        <input onChange={ ()=>{ setToAll(false); } } type="checkbox"  radioGroup='mail_to_type' checked={!toAll} className="checkbox" />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="text-lg">All Individual Member</span>
                        <input onChange={ ()=> { setToAll(true); } } type="checkbox" radioGroup='mail_to_type' checked={toAll} className="checkbox" />
                    </label>
                    <label className="label cursor-pointer pb-1 mb-0">
                        <span className="text-lg">Send to members of a game</span>
                        <input onChange={ (e)=>{ setIsforGame( !isForGame ); }}
                            type="checkbox"  
                            radioGroup='mail_to_type' 
                            checked={isForGame} 
                            className="checkbox"
                        />
                    </label>
                    { isForGame && <select className="select input form-control border-teal-100 mt-2 text-lg font-bold" value={ selectedGame.id || -1 } onChange={()=>{}}>
                            <option aria-readonly disabled value={-1}> Select a game please. </option>
                                {options}
                        </select>
                    }
                </div>

                {/* <input type='text' className='input form-control w-full border-2 border-gray-300'/> */}
                <textarea className="input w-full mt-6 textarea textarea-bordered text-lg" 
                        placeholder="Enter Message"
                        value={message}
                        onChange={ e => {
                            setMessage(e.target.value);
                        }}
                ></textarea>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn" disabled={isLoading}>Close</button>
                    </form>
                    <button className='btn btn-primary'
                        disabled={ true } // isForGame ? (selectedGame.id === undefined || !message) : !message  }
                        onClick={ ()=> {
                            notifyRegisteredMembers();
                        } }
                    >{ isLoading ? <Loader/> : "Disabled Intentionally" }</button>
                </div>
            </div>
        </dialog>
    );

    return ( <>
        <button className="btn btn-primary flex-1"
                onClick={ () => document.getElementById('modal_notify').showModal() }
        > Notify Teams </button>
        { dialog }
    </> );
}