import { useState } from "react";
import Loader from "./Loader";

export default function Payment( { isLoading, onNext } ){
    const [ tranId, setTranId ] = useState("");
    const [ completed, setCompleted ] = useState(false);
    const [ payOffline, setPayOffline ] = useState(false);
    const [ paymentMethod, setPaymentMethod ] = useState("");

    const paymentMethodOptions = ["Bkash", "Nagad", "Offline"].map( el => {
        return <option value={el.toLocaleLowerCase()}>{el}</option>;
    });

    return (<>
        { completed &&  <div className="h-12 flex items-center mb-0.5rem"> <h1 className="text-lg font-bold"> Completed </h1> </div> }
        
        { !completed &&  <div className="flex flex-col justify-center gap-1">
            <p className="font-bold text-black">Method: </p>
            <select value={ paymentMethod || "notselected" }
                className="select input form-control items-center justify-center"
                onChange={ e =>{
                    setPaymentMethod(e.target.value);
                    setPayOffline(e.target.value === "offline" );
                }}>
                <option value={"notselected"} disabled>Select payment method</option>
                { paymentMethodOptions }
            </select>
            {/* { paymentMethod.toString() } */}

            { !payOffline && <>
                <h1 className="text-md font-bold text-black">Send Money (Personal):</h1>
                {/* <h1 className="text-md font-normal text-gray-900">Please send money the amount to the given account.</h1> */}
                <h1 className="text-md font-bold text-gray-500">Bkash : <span className="px-2 text-green-400">01729576685</span> </h1>
                <h1 className="text-md font-bold text-gray-500">Nagad : <span className="px-2 text-green-400">01757964121</span> </h1>
                
                <label className="input input-bordered flex items-center gap-3 mt-1">
                    <input type="text" className="grow" placeholder="Enter Transaction Id" 
                        onClick={ e =>{
                            if( !paymentMethod )
                                alert("Choose a payment method first.")                            
                        }}
                        value={ tranId } 
                        onChange={ ( e )=>{
                            setTranId(e.target.value);
                        }} 
                        />
                </label> 
            </>
            }
            { payOffline && <>
                <h1 className="text-sm font-bold text-black mt-1">Contact any of these volunteers: </h1>
                <hr/>
                <h3 className="text-md font-bold text-black">Naim: <span className="px-2 text-green-400">01602676313</span> </h3>
                <h3 className="text-md font-bold text-black">Parvej: <span className="px-2 text-green-400">01771028724</span> </h3>
                <hr/>
                <h3 className="text-md font-bold text-black">Mithila: <span className="px-2 text-green-400">01715840989</span> </h3>
                <hr/>
            </>}

            <div className="form-control text-black flex-1l">
                <label className=" flex justify-start gap-2 cursor-pointer mt-2">
                    <input type="checkbox"  className="checkbox mt-0" checked={payOffline}
                            onChange={ e=>{
                                setPayOffline(!payOffline);
                                if( !payOffline ) setPaymentMethod("offline");
                                else setPaymentMethod("");
                            } } 
                            />
                    <span className="text-left">I am willing to pay offline.</span>
                </label>
            </div>
            
            <div className="flex justify-end"> 
                <button className="btn btn-primary mt-2 text"
                        disabled={ !payOffline && tranId.length==0 }
                        onClick={ ()=>{
                            onNext( paymentMethod, tranId);
                            setCompleted(true);
                        }}
                >
                { isLoading ? <Loader/> : "Next" }
                </button>
            </div>
        </div> 
        }
    </>);
}