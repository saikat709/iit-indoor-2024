import { useState } from "react";
import Loader from "./Loader";

export default function Payment( { isLoading, onNext } ){
    const [ tranId, setTranId ] = useState("");
    const [ completed, setCompleted ] = useState(false);
    const [ payOffline, setPayOffline ] = useState(false);

    return (<>
        { completed &&  <div className="h-12 flex items-center mb-0.5rem"> <h1 className="text-lg font-bold"> Completed </h1> </div> }
        
        { !completed &&  <div className="flex flex-col justify-center gap-1">

            { !payOffline && <>
                <h1 className="text-lg font-bold text-black">Send Money</h1>
                <h1 className="text-md font-normal text-gray-900">Please send money the amount to the given account.</h1>
                <h1 className="text-lg font-bold text-black">Bkash ( Personal ) : <span className="px-2 text-green-400">0152177*********</span> </h1>
                
                <label className="input input-bordered flex items-center gap-3 mt-4">
                    <input type="text" className="grow" placeholder="Enter Transaction Id" 
                        value={ tranId } 
                        onChange={ ( e )=>{
                                setTranId(e.target.value);
                            }} 
                        />
                </label> 
            </>
            }

            <div className="form-control text-black flex-1l">
                <label className=" flex justify-start gap-2 cursor-pointer mt-2">
                    <input type="checkbox"  className="checkbox mt-0" checked={payOffline}
                            onChange={ e=>{
                                setPayOffline(!payOffline);
                            } } 
                            />
                    <span className="text-left">I will pay hand to hand.</span>
                </label>
            </div>
            
            <div className="flex justify-end"> 
                <button className="btn btn-primary mt-2 text"
                        disabled={ !payOffline && tranId.length==0 }
                        onClick={ ()=>{
                            onNext(tranId);
                            setCompleted(true);
                        } }
                >
                { isLoading ? <Loader/> : "Next" }
                </button>
            </div>
        </div> 
        }
    </>);
}