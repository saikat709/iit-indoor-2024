import { useEffect, useState } from "react";

function Player( { onPlayerAdd } ){

    const [ batch, setBatch ] = useState("");
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");

    const batches = [...Array(16).keys() ].map((x)=>{
        const ind = ++x;
        const indStr = ind.toString().padStart(2, "0");
        return [ "bsse" + indStr, "BSSE" + indStr ];
    });

    const batchOptions = batches.map( batch => {
        return ( 
            <option key={batch[0]} value={batch[0]} 
                onChange={ (e)=> { 
                    setBatch( batch[0] );
                }}
            > { batch[1] } </option>
        );
    });

    useEffect( ()=>{
        console.log(batch);
    });

    return (<>
        <form className="flex flex-col gap-2 w-full"
            onSubmit={ (e)=> {
                e.preventDefault();
                onPlayerAdd( { name, email, batch } );
                setName("");
                setBatch("");
                setEmail("");
            }}
            >
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input type="text" required 
                        className="grow" 
                        placeholder="Name"
                        value={name}
                        onChange={ e => {
                            setName(e.target.value);
                        }}
                    />
            </label>
            
            <select required 
                    className="select select-bordered w-full max-w-xs" 
                    value={ batch == "" ? "notselected" : batch }
                    onChange={ e => {
                        setBatch(e.target.value);
                    }}
                    >
                <option disabled value={"notselected"}> Select batch </option>
                    { batchOptions }
            </select>

            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70 text-gray-300">
                    <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="email" required 
                       className="grow text-gray-300" 
                       placeholder="Email" 
                       value={email}
                       onChange={ e=> {
                            setEmail(e.target.value);
                        }}
                    />
            </label>

            <div className="flex justify-end"> 
                <button type="submit"
                    className="btn btn-primary mt-2 btn-secondary"
                    disabled = { batch.length === 0 || email.length === 0 || name.length === 0 }
                    > Done </button>
            </div>
        </form>
    </>);
}


export default function TeamPlayers({ onNext, playerCount }){
    const [ players, setPlayers ] = useState([]);
    const [ completed, setCompleted ] = useState(false);

    return (<>
        { completed && <div className="h-12 flex items-center"> <h1 className="text-lg font-bold"> Completed </h1> </div> }
        
        { !completed &&  
            <div className="flex flex-col justify-center gap-2">
                <h2 className="text-black text-lg font-semibold">Add { playerCount } Player{ playerCount>1 ? "s" : " " }</h2>
                <h2 className="font-bold text-lg text-gray-600">Player no: {  (players.length+1).toString() }</h2>
                
                { players.length >= playerCount?
                    <h1 className="text-lg md:text-2xl font-mono font-bold text-amber-800 h-12">Player full </h1>
                : <Player 
                    onPlayerAdd = { (p) => {
                        setPlayers( [...players, {...p} ] );
                    }}
                />}

                { ( players.length >= playerCount ) &&
                     <div className="flex justify-center"> 
                        <button className="btn btn-primary mt-2"
                                onClick={ ()=>{
                                    onNext(players);
                                    setCompleted(true);
                                } }
                                disabled={ !(players.length >= playerCount) }
                        >Next</button>
                    </div>
                }
            </div> 
        }
    </>);
}