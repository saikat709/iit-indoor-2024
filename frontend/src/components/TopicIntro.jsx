import React from "react";
import TypeWritter from 'typewriter-effect';

export default function TopicIntro(){
    const titleText = "IIT Indoor Games Registration 2024";

    return (<>
        <div className="flex justify-center items-center mt-3 md:mt-4">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-300 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text mx-2 text-justify">
                <TypeWritter
                    onInit={(typewriter) => {
                        typewriter
                        .typeString( titleText )
                        .callFunction(() => {  })
                        .pauseFor(2500)
                        .deleteAll()
                        .pauseFor(2500)
                        .callFunction(() => {  })
                        .typeString( titleText )
                        .pauseFor(2500)
                        .deleteAll()
                        .typeString( titleText )
                        .pauseFor(2500)
                        .deleteAll()
                        .pauseFor(2500)
                        .typeString( titleText )
                        .pauseFor(2500)
                        .deleteAll()
                        .pauseFor(2500)
                        .typeString( titleText )
                        .pauseFor(2500)
                        .deleteAll()
                        .pauseFor(2500)
                        .typeString( titleText )
                        .pauseFor(2500)
                        .deleteAll()
                        .typeString( titleText )
                        .start();
                    }}
                />
            </h1>
        </div>
    </>);
}