import { toast } from "react-toastify";
import useFetch from "../context/hooks/usefetch";
import { useState } from "react";
import Loader from "./Loader";

/*{ regId, tranId }*/

export default function RegistrationCard( { reg, onAcceptOrRemove } ){
    const api = useFetch();
    const [ declineMsg, setDeclineMsg ] = useState("");
    const [ isAccepting, setIsAccepting ] = useState(false);
    const [ isDeclining, setIsDeclining ] = useState(false);
    const [ error, setError ] = useState("");

    const sendNotificationMail = ()=>{
        setIsDeclining(true);
        api.sendMail( declineMsg, reg.team.team_email, "Team registration" )
        .then( res => {
            setIsDeclining(false);
            toast("Declined successfully.")
            onAcceptOrRemove();
        })
        .catch( err => {
            toast(err);
            setIsDeclining(false);
        });
    }

    const handleSubmitDecline = ()=> {
        setIsDeclining(false);
        // console.log( reg.team.team_email, reg.id );
        api.declineRegistration( reg.id, declineMsg )
        .then( res => {
            setIsDeclining(false);
            if( res.ok ) sendNotificationMail();
        })
        .catch( err => {
            toast(err);
            setIsDeclining(false);
        });
    }

    const handleAccept = ()=> {
        setIsAccepting(true);
        api.acceptRegistration(reg.id)
        .then( res => {
            setIsAccepting(false);
        })
        .catch( err => {
            setIsAccepting(false);
            toast(err);
        });
        setIsAccepting(true);
        const msg = "Thank you for perticipating in IITIndoor2024."
        api.sendMail(msg, reg.team_email, "Payment clear")
        .then( res =>{
            setIsAccepting(false);
            toast("Accepted successfully.")
            onAcceptOrRemove();
        })
        .catch( err => {
            setIsAccepting(false);
            alert(err);
        })
    }


    const declineModal = (
        <dialog id={"decline_registration_modal_"+reg.id} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg nd:text-2xl mb-2">Are you sure to decline?</h3>
                <input className="input border-b-2 border-white w-full" 
                        placeholder="Enter your decline message.."
                        value={ declineMsg }
                        onChange={ e=>{setDeclineMsg(e.target.value)} }
                    />
                <div className="modal-action">
                <form method="dialog" className="flex gap-2">
                    <button className="btn btn-warning">Close</button>
                    <button className="btn btn-error"
                            onClick={ ()=>{ handleSubmitDecline(); } }
                            disabled={declineMsg.length==0}
                    >{ "Submit" }</button>
                </form>
                </div>
            </div>
        </dialog>
    );

    return (
        <div className="card bg-neutral text-neutral-content mx-2">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-success">{reg.team.name}</h2>
                <h3 className="card-title text-white text-sm">{reg.team.team_email}</h3>
                { reg.transaction_id
                    ? <p className="text-md text-pretty">Transaction Id : <span className="text-white font-mono font-bold text-lg"> { reg.transaction_id } </span> </p> 
                    : <p className="text-warning px-2"> Willing to pay hand to hand </p>
                }
                <div className="card-actions justify-end">
                <button className="btn btn-primary px-6"
                    onClick={ ()=>{  
                        // toast("Make accept-registration api call here.");
                        handleAccept(); 
                    } }
                    >{ isAccepting ? <Loader/> : "Accept" }</button>
                <button className="btn btn-error px-6"
                    onClick={ ()=> {
                        document.getElementById(`decline_registration_modal_${reg.id}`).showModal()
                    } }
                    >{ isDeclining ? <Loader/> : "Decline" }</button>
                </div>
            </div>

            { declineModal }
        </div>
    );
}