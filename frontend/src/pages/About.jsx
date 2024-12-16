
export default function About(){
    return (
        <div className="flex w-full justify-center flex-col items-center mt-8">
            <h1 className="font-bold text-2xl underline mb-5 text-white"> About this site </h1>
            <h2 className="font-semibold text-md text-emerald-300 text-justify w-4/5 md:w-3/5"> This site is being used for Indoor Tournament 2024, Institute of Information Technology, University of Dhaka. </h2>
            <h2 className="font-semibold text-md text-gray-200 text-justify w-4/5 md:w-3/5"> Date: December 27-28, 2024 </h2>
            <a href="mailto:bsse16@iit.du.ac.bd" className="font-semibold text-md text-gray-200 text-justify w-4/5 md:w-3/5"> Support: <span className="underline">bsse16@iit.du.ac.bd </span> </a>
        </div>
    );  
}