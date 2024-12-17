import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import useFetch from '../context/hooks/usefetch';
import NotifyTeamMembers from '../components/NotifyTeamMembers';
import RegistrationLookUp from '../components/RegistrationLookup';
import Loader from '../components/Loader';


function ModeratorContent(){
    const [ activeTab, setActiveTab ] = useState(0);
    const api = useFetch();
    const [ games, setGames ] = useState([]);
    const [ isLoading, setIsLoading ] = useState();

    useEffect( () => {
        setIsLoading( true );
        api.getGames()
        .then(response => response.json())
        .then( data => {
            setIsLoading(false);
            setGames( data );
            // console.log( data );
        } )
        .catch((err) => {
            setIsLoading( false );
            alert(err);
        });
    }, [] );

    return (<>
        <div className="flex flex-col shadow-slate-400 mt-6">
            
            <div className='flex flex-grow gap-1 flex-wrap border-b-secondary border-b-2'>
                <button onClick={ () => { setActiveTab(0) } }
                    className={"btn flex-grow text-bold text-white " + (activeTab==0 ? " btn-secondary btn-square rounded-none" :" btn-ghost") } 
                > Registrations </button>

                <button onClick={ () => { setActiveTab(1) } }
                    className={"btn flex-grow text-bold text-white "+(activeTab==1 ? " btn-secondary btn-square rounded-none" :" btn-ghost") }
                > Others </button>
            
            </div>

            <div>
            { activeTab==0 && <div className="border-base-300 rounded-box p-6 h-full ">
                <RegistrationLookUp />
              </div>
            }

            { activeTab==1 && 
                <div className="bg-base-100 border-base-300 rounded-box p-6">
                    <div className="flex md:flex-row justify-center md:mx-36 flex-col gap-1">
                        <Link to={"/pdf"} state={ { fromLink: true } } className="btn btn-primary flex-1">Pdf Report</Link>
                        { isLoading ?  <div className='flex justify-center'> <Loader/> </div> : <NotifyTeamMembers games={games} /> }
                    </div>
                </div>
            }

            </div>

        </div>
    </>);
}


const KEY_SECRET_KEY = "iit_indoor_2024_moderator_secret_key";

export default function Moderator(){
    const [ secretKey, setSecretkey ] = useState("");
    const [ isModerator, setIsModerator ] = useState(false);

    useEffect(()=>{
        const prev_key = localStorage.getItem(KEY_SECRET_KEY);
        if ( !prev_key ) document.getElementById('get_secret_key_modal').showModal();
        else setIsModerator(true);
    }, []);

    const handleSecretKeySubmit = ()=>{
        if ( secretKey === 'bsse16' ){
            localStorage.setItem(KEY_SECRET_KEY, secretKey);
            document.getElementById('get_secret_key_modal').close();
            setIsModerator(true);
        } else {
            alert("Wrong code.");
        }
    };

    return (<>
        <dialog id="get_secret_key_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-xl">Are you a moderator of this site?</h3>
                <p className="py-4">Please enter the secret key given to you.</p>
                <input type="password" 
                       className="input w-full form-control from-cyan-200 border-2 border-gray-300" 
                       value={secretKey} placeholder="Secret key"
                       onChange={ e => setSecretkey(e.target.value) }
                       />
                <div className="modal-action">
                { secretKey==="" ? <Link to={"/"} className="btn btn-secondary bg-opacity-50 text-white"> Leave This Page </Link> 
                    : <button className="btn btn-primary" onClick={ handleSecretKeySubmit }>Varify Secret Key</button> }
                </div>
            </div>
        </dialog>

        { isModerator ? <ModeratorContent /> 
            : <button className='btn btn-primary m-12' onClick={ ()=>document.getElementById('get_secret_key_modal').showModal() }>I am a moderator. </button> }
    </>);
}