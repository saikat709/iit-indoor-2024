import Register from "../../pages/Register";

const BASE_URL = "http://127.0.0.1:8000/api/";

const GAME_API_URL = BASE_URL + "game/";
const PLAYER_API_URL = BASE_URL + "player/";
const TEAM_API_URL =  BASE_URL + "team/";
const REGISTRATION_API_URL = BASE_URL + "registration/";
const COMBINED_REGISTRATION_API_URL  = BASE_URL + "registration-combined/";
const MAIL_SEND_API = BASE_URL + "mail/"

export default function useProvideFetch(){

    const get_request_options = { 
        mode: 'no-cors',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials' : true
        }
    }

    const getGames = () => {
        return fetch(GAME_API_URL);
    }

    const getGame = ( id ) => {
        return fetch( GAME_API_URL + id );
    }

    const getRegistrations = ( ) => {
        return fetch( REGISTRATION_API_URL );
    }

    const getTeams = ( ) => {
        return fetch( TEAM_API_URL );
    }

    const register = ( data ) => {
        return fetch( COMBINED_REGISTRATION_API_URL,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method : "POST",
                body: JSON.stringify(data),
            }
        );
    }

    const acceptRegistration = (id)=> {
        return fetch(REGISTRATION_API_URL + id + '/', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method : "PATCH",
                body: JSON.stringify({
                    status: 'accepted'
                }),
        });
    }


    const declineRegistration = ( id, message )=> {
        // window.alert("HERE I AM");
        return fetch( REGISTRATION_API_URL + id + '/', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method : "PATCH",
                body: JSON.stringify({
                    message: message,
                    status: 'declined'
                }),
        });
    }


    const sendMail = (message, send_to, subject )=>{
        return fetch( MAIL_SEND_API, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method : "POST",
                body: JSON.stringify({
                    message: message,
                    to: send_to,
                    subject: subject
                }),
        });
    }

    return {
        getGame, getGames, 
        register, getTeams, 
        getRegistrations, 
        declineRegistration, 
        acceptRegistration, 
        sendMail, 
    }
}