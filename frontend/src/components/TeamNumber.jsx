import { useState } from "react";

export default function TeamNumber( { emails, onNext } ){
    const [ number, setNumber ] = useState(emails[0]);
    const [ completed, setCompleted ] = useState(false);

    const options =  emails.map( email => <option key={email} value={email}>{ email }</option> );

    return (<>
        { completed &&  <div className="h-12 flex items-center mb-0.5 text-black"> <h1 className="text-lg font-bold"> Completed </h1> </div> }
        
        { !completed &&  <div className="flex flex-col justify-center gap-1">
            <h1 className="text-black font-bold text-lg mb-2"> A Team number is needed </h1>
            <h2 className="text-warning pb-4 text-sm"> It is important in some cases. We may need to call the team sometimes. </h2>
            <form onSubmit={(e)=>{
                    e.preventDefault();
                    onNext(number);
                    setCompleted(true);
                }}>
                <label className="input input-bordered flex items-center gap-2 text-gray-100 bg-gray-800">
                    {/* <select type="text" className="grow w-56 bg-transparent" placeholder="Email" 
                        onChange={ value => setTeamEmail(value) }
                        >
                        {options}
                    </select> */}
                    <input type="tel" required placeholder="Enter mobile number"
                        onChange={ e=>{
                            setNumber(e.target.value);
                        }}
                    />
                </label>
                <div className="flex justify-end"> 
                    <button className="btn btn-primary mt-2"
                            type="submit"
                            disabled={number.length < 11 || number.length > 15}
                    >Next</button>
                </div>
                
            </form>
        </div> 
        }
    </>);
}