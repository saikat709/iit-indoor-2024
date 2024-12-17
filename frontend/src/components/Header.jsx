// import { useState } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MY_RECENT_TEAM } from '../constants';

export default function Header({ curPath }){

    const [showNavOption, setShowNavOption ] = useState(false);
    const recentTeamData = localStorage.getItem(MY_RECENT_TEAM);
    const navClass = "btn btn-ghost btn-rounded hover:bg-blue-600 hover:bg-opacity-20 hover:text-black text-black";

    return (<>
        <div className='flex justify-center bg-amber-50 shadow-gray-600 shadow-sm w-full '>
            <div className="navbar flex justify-between px-6 md:w-4/5 md:px-0 md:ps-1 ">
                <div className="relative">
                    <div className="dropdown md:hidden"> { /*  md:hidden */}
                    <div tabIndex={0} 
                        onClick={ ()=>{ setShowNavOption(!showNavOption) }}
                        className="btn btn-ghost btn-circle text-black">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    { showNavOption && 
                        <ul
                            tabIndex={0}
                            className="menu menu-lg absolute bg-amber-50 rounded-box z-[5] mt-3 w-52 p-2 shadow-lg text-black">
                            <Link onClick={ e => { setShowNavOption(false) } }
                                className={navClass + ( curPath==='/'      ? " bg-blue-800 text-white" : "" ) } to={"/"} > Home</Link>
                            <Link to={ "/teams" } 
                                onClick={ e => { setShowNavOption(false) } }
                                className={navClass + ( curPath==='/teams' ? " bg-blue-800 text-white" : "" ) } >
                                <div className="indicator p-1">
                                    <p className="mx-0"> Teams </p>
                                    { recentTeamData && <span className="badge badge-xs badge-secondary indicator-item"></span> }
                                </div>
                            </Link>
                            <Link onClick={ e => { setShowNavOption(false) } }
                                className={navClass + ( curPath==='/moderator'      ? " bg-blue-800 text-white" : "" ) } to={"/moderator"} > Moderator </Link>
                            <Link className={navClass + ( curPath==='/about' ? " bg-blue-800 text-white" : "" ) } to={"/about"} onClick={ e => { setShowNavOption(false) } }> About </Link>
                        </ul>
                    }
                    </div>
                    <div>
                        <Link to={'/'} 
                            onClick={ e => { setShowNavOption(false) } }
                            className="btn btn-ghost text-xl text-primary">IIT Indoor 2024</Link>
                    </div>
                </div>
            
                <div className="hidden md:block">
                    <Link to={"/"}  className={navClass + ( curPath==='/' ? " underline" : "" ) }>  Home </Link>
                    <Link to={ "/teams" } className={navClass + ( curPath==='/teams' ? " underline" : "" ) }>
                        <div className="indicator p-1">
                            <p className="mx-0"> Teams </p>
                            { recentTeamData && <span className="badge badge-xs badge-primary indicator-item"></span> }
                        </div>
                    </Link>
                    <Link className={ navClass + ( curPath==='/moderator' ? " underline" : "" ) } to={"/moderator"} > Moderator </Link>
                    <Link className={ navClass + ( curPath==='/about' ? " underline" : "" ) } to={"/about"} > About </Link>
                </div>
            </div>
        </div>
    </>);
}