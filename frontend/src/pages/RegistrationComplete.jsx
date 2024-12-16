import { Link, Navigate, useLocation } from "react-router-dom";


export default function RegistrationComplete(){
    const location  = useLocation();

    if ( !location.state?.fromLink ){
        return (<Navigate to={'/404'} replace ></Navigate>);
    }

    return (
        <div className="flex flex-col justify-center items-center mt-12 md:mt-24 mx-6 md:mx-12">
            <h1 className="text-2xl md:text-3xl text-success font-bold">Your registration is complete. </h1>
            <h1 className="text-xl text-warning md:text-2xl"> You will be notified after the confirmation. Keep patience. </h1>
            <Link to={ '/' } replace className="btn btn-primary m-3 mb-6"> Go to Home </Link>
        </div>
    );
}