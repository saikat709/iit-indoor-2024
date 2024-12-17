export default function Footer(){

    return (
    <>
        <footer className="w-full flex-col md:flex-row flex justify-center items-center gap-1 p-3 py-6 text-md bg-base-300 text-slate-100 font-bold">
            <code className="flex flex-col justify-center items-center">
                <p>Make this website better! </p> <a href="https://www.github.com/saikat709/iit-indoor-2024" target="_blank" className="text-primary underline block">Contribute</a>
                <p>Suggetions for me - </p> <a href="mailto:bsse1629@iit.du.ac.bd" className="text-primary underline block">bsse1629@iit.du.ac.bd</a>
            </code>
            <div className="h-px md:h-full w-full md:w-px md:mx-4 text-black bg-slate-300 my-2"></div>
            {/* <div className="h-1 w-full bg-slate-400"></div> */}
            <code className="flex flex-col justify-center items-center">
                <h2> Developed and Maintained by - </h2>
                <h2 className="font-sans text-lg text-nowrap text-zinc-50"> Mohammad Saikat Islam</h2>
                <h2> Institute of Information Technology, </h2>
                <h2>University of Dhaka </h2>
            </code>
        </footer>
    </>);
}