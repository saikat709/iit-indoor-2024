export default function Footer(){

    return (
    <>
        <footer className="w-full flex-col flex justify-center items-center gap-1 p-3 text-md bg-white text-slate-900 font-bold">
            <code className="flex flex-col justify-center items-center md:flex-row">
                <p>Make this website better! </p> <a href="https://www.github.com/saikat709/iit-indoor" target="_blank" className="text-primary underline">Contribute</a>
            </code>
            <code className="flex flex-col justify-center items-center md:flex-row">
                <p>Suggetions for me - </p> <a href="mailto:bsse1629@iit.du.ac.bd" className="text-primary underline">bsse1629@iit.du.ac.bd</a>
            </code>
            <div className="h-px w-full text-black bg-black my-2"></div>
            {/* <div className="h-1 w-full bg-slate-400"></div> */}
            <h2> Being maintained by BSSE16 Batch. </h2>
            <h2> Institute of Information Technology </h2>
            <h2>University of Dhaka </h2>
        </footer>
    </>);
}