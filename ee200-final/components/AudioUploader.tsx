"use client";


import {
    useState
} from "react";


import axios from "axios";


import {
    Upload,
    Loader2
}
    from "lucide-react";


import ResultCard from "./ResultCard";



export default function AudioUploader({
  setResult,
}: {
  setResult: (data: any) => void;
}){


    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);

    // const [result, setResult] = useState<any>(null);



    async function identify() {


        if (!file)
            return;


        setLoading(true);

        setResult(null);



        const formData = new FormData();


        formData.append(
            "file",
            file
        );



        const start = Date.now();


        try {


            const response = await axios.post(

                `${process.env.NEXT_PUBLIC_BACKEND_URL}/identify`,

                formData

            );



            const end = Date.now();
const data = await response.data;

setResult(data);


            setResult({

                ...response.data,

                time: (end - start) / 1000

            });


        }

        catch (error) {

            alert(
                "Identification failed"
            );

        }


        setLoading(false);

    }



    return (

        <div>


            <div
                className="
border-2
border-dashed
border-zinc-700
rounded-xl
p-10
text-center
"
            >


                <Upload
                    size={45}
                    className="
mx-auto
mb-4
"
                />



                <input

                    type="file"

                    accept="audio/*"

                    onChange={
                        (e) =>
                            setFile(
                                e.target.files?.[0] || null
                            )
                    }

                />


                {
                    file &&
                    <p
                        className="
mt-4
text-gray-400
"
                    >
                        {file.name}
                    </p>
                }


                <button

                    onClick={identify}

                    disabled={loading}

                    className="
mt-6
bg-blue-600
hover:bg-blue-700
px-8
py-3
rounded-lg
"

                >


                    {

                        loading ?

                            <Loader2
                                className="animate-spin"
                            />

                            :

                            "Identify Song"

                    }


                </button>


            </div>



            {
                // result &&

                // <ResultCard

                //     song={result.song}

                //     score={result.score}

                //     time={result.time}

                // />

            }


        </div>


    )

}