import { useState } from "react";

export default function TeamEmail( { emails, onNext } ){
    const [ teamEmail, setTeamEmail ] = useState(emails[0]);
    const [ completed, setCompleted ] = useState(false);

    const options =  emails.map( email => <option key={email} value={email}>{ email }</option> );

    return (<>
        { completed &&  <div className="h-12 flex items-center mb-0.5 text-black"> <h1 className="text-lg font-bold"> Completed </h1> </div> }
        
        { !completed &&  <div className="flex flex-col justify-center gap-1">
            <h1 className="text-black font-bold text-lg mb-2"> A Team email is needed </h1>
            <h2 className="text-warning pb-4 text-sm"> Not important for single player. Players email is considered the team email. </h2>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <select type="text" className="grow w-56 bg-transparent" placeholder="Email" 
                    onChange={ value => setTeamEmail(value) }
                    >
                    {options}
                </select>

            </label>
            <div className="flex justify-end"> 
                <button className="btn btn-primary mt-2"
                        onClick={ ()=>{
                            onNext(teamEmail);
                            setCompleted(true);
                        } }
                >Next</button>
            </div>
        </div> 
        }
    </>);
}