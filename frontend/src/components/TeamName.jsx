import { useEffect, useState } from "react";

export default function TeamName({ onNext, playerName }){
    const [ teamName, setTeamName ] = useState("");
    const [ completed, setCompleted ] = useState(false);

    useEffect( () => {
        // console.log( playerName );
        if( playerName )
            setTeamName("Team_" + playerName.split(" ").join("_"));
    }, [] );

    return (<>
        { completed &&  <div className="h-12 flex items-center mb-0.5rem"> <h1 className="text-lg font-bold text-black"> Completed </h1> </div> }
        
        { !completed &&  <div className="flex flex-col justify-center gap-2 text-black">

            <h1 className="text-lg font-bold">A Team name..</h1>
            <h4 className="mb-3">Not important for single player.</h4>

            <label className="input input-bordered flex items-center gap-3">
                {/* <img src={ process.env.PUBLIC_URL +"/images/group.png"} alt="img leader " className="h-5 w-5" /> */}
                
                <input type="text" className="grow text-white" placeholder="Team Name.." 
                       value={teamName} 
                       onChange={ e=>{ setTeamName(e.target.value)} } 
                    />
            </label>
            <div className="flex justify-end"> 
                <button className="btn btn-primary mt-2"
                        onClick={ ()=>{
                            onNext(teamName);
                            setCompleted(true);
                        } }
                >Next</button>
            </div>
        </div> 
        }
    </>);
}