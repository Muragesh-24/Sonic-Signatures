"use client";

import { useEffect, useState } from "react";
import { getSongHistory } from "@/utils/history";


export default function HistoryPage() {

    const [history, setHistory] = useState<any[]>([]);


    useEffect(() => {
        setHistory(getSongHistory());
    }, []);



    function deleteSong(index:number){

        const updated = history.filter(
            (_,i)=>i!==index
        );

        setHistory(updated);

        localStorage.setItem(
            "song_history",
            JSON.stringify(updated)
        );
    }



    function clearHistory(){

        localStorage.removeItem(
            "song_history"
        );

        setHistory([]);

    }



    function formatTime(timestamp:number){

        return new Date(timestamp)
        .toLocaleString(
            "en-US",
            {
                day:"2-digit",
                month:"short",
                year:"numeric",
                hour:"2-digit",
                minute:"2-digit"
            }
        );

    }



    return (

        <main className="
            min-h-screen
            bg-black
            text-white
            px-5
            py-10
            md:px-12
        ">


            <div className="
                max-w-4xl
                mx-auto
            ">


                <div className="
                    flex
                    justify-between
                    items-center
                    mb-10
                ">

                    <div>

                        <h1 className="
                            text-4xl
                            font-bold
                            tracking-tight
                        ">
                            Detection History
                        </h1>


                        <p className="
                            text-zinc-400
                            mt-2
                        ">
                            Recently identified songs
                        </p>

                    </div>



                    {
                        history.length > 0 && (

                            <button
                            onClick={clearHistory}
                            className="
                            bg-red-500/10
                            text-red-400
                            border
                            border-red-500/20
                            hover:bg-red-500/20
                            px-5
                            py-2.5
                            rounded-xl
                            transition
                            "
                            >
                                Clear All
                            </button>

                        )
                    }


                </div>





                {
                    history.length===0 ? (

                        <div className="
                            border
                            border-zinc-800
                            rounded-2xl
                            p-12
                            text-center
                            bg-zinc-950
                        ">


                            <div className="
                                text-5xl
                                mb-4
                            ">
                                🎵
                            </div>


                            <h2 className="
                                text-xl
                                font-semibold
                            ">
                                No history yet
                            </h2>


                            <p className="
                                text-zinc-500
                                mt-2
                            ">
                                Detected songs will appear here
                            </p>


                        </div>


                    ) : (


                        <div className="
                            space-y-4
                        ">


                        {
                            history.map(
                                (item,index)=>(


                                <div
                                key={index}
                                className="
                                group
                                flex
                                items-center
                                justify-between
                                bg-zinc-950
                                border
                                border-zinc-800
                                hover:border-zinc-600
                                rounded-2xl
                                p-5
                                transition
                                "
                                >


                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                    ">


                                        <div className="
                                            h-12
                                            w-12
                                            rounded-full
                                            bg-gradient-to-br
                                            from-purple-500
                                            to-blue-500
                                            flex
                                            items-center
                                            justify-center
                                            text-xl
                                        ">
                                            🎧
                                        </div>



                                        <div>

                                            <h3 className="
                                                font-semibold
                                                text-lg
                                            ">
                                                {item.song}
                                            </h3>


                                            <p className="
                                                text-sm
                                                text-zinc-500
                                            ">
                                                {formatTime(item.time)}
                                            </p>

                                        </div>


                                    </div>





                                    <button
                                    onClick={()=>
                                        deleteSong(index)
                                    }
                                    className="
                                    opacity-0
                                    group-hover:opacity-100
                                    text-zinc-500
                                    hover:text-red-400
                                    transition
                                    px-3
                                    py-2
                                    "
                                    >

                                        ✕


                                    </button>



                                </div>


                            ))
                        }


                        </div>

                    )
                }


            </div>


        </main>

    );
}