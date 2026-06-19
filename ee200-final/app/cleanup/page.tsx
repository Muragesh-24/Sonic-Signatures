"use client";

import { useState } from "react";
import axios from "axios";

export default function CleanupPage(){

    const [message,setMessage] = useState("");

    async function cleanup(){

        try{

            const response = await axios.delete(
                "http://localhost:8000/cleanup"
            );

            setMessage(
                `Deleted ${response.data.deleted_files.length} files`
            );

        }
        catch(error){

            console.error(error);

            setMessage(
                "Cleanup failed"
            );
        }
    }


    return (

        <div
            className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-black
            text-white
            "
        >

            <div
                className="
                bg-zinc-900
                p-8
                rounded-xl
                "
            >

                <h1
                    className="
                    text-2xl
                    font-bold
                    mb-5
                    "
                >
                    Backend Cleanup
                </h1>


                <button
                    onClick={cleanup}
                    className="
                    bg-red-600
                    px-6
                    py-3
                    rounded-lg
                    hover:bg-red-700
                    "
                >
                    Delete Static Files
                </button>


                {
                    message &&
                    <p className="mt-4">
                        {message}
                    </p>
                }

            </div>

        </div>

    );
}