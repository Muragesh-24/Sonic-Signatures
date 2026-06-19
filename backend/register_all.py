import os
import multiprocessing

from multiprocessing import Pool

from tqdm import tqdm


from audio_processing import *

from fingerprint import *

from database_operations import *



MUSIC_FOLDER = "../songs"




def process_song(filename):

    try:


        path=os.path.join(

            MUSIC_FOLDER,

            filename

        )


        print(
            f"Processing {filename}"
        )


        y,sr = load_audio(

            path

        )


        spectrogram = compute_spectrogram(

            y,

            sr

        )


        peaks = detect_peaks(

            spectrogram

        )


        hashes = generate_hashes(

            peaks

        )


        return {

            "song":filename,

            "hashes":hashes,

            "peaks":len(peaks),

            "fingerprints":len(hashes)

        }



    except Exception as e:


        return {

            "song":filename,

            "error":str(e)

        }





if __name__=="__main__":


    songs=[]


    for file in os.listdir(
        MUSIC_FOLDER
    ):

        if file.lower().endswith(

            (
            ".mp3",
            ".wav",
            ".m4a"
            )

        ):

            songs.append(file)



    workers=max(

        1,

        multiprocessing.cpu_count()-1

    )



    print("======================")

    print(
        "Songs:",
        len(songs)
    )

    print(
        "Workers:",
        workers
    )

    print("======================")




    with Pool(workers) as pool:


        results=list(

            tqdm(

                pool.imap(

                    process_song,

                    songs

                ),

                total=len(songs)

            )

        )



    print(
        "\nSaving database..."
    )



    for result in results:


        if "error" in result:

            print(

                "FAILED:",

                result["song"],

                result["error"]

            )


            continue



        print(

            result["song"],

            "| Peaks:",

            result["peaks"],

            "| Hashes:",

            result["fingerprints"]

        )



        insert_fingerprints(

            result["hashes"],

            result["song"]

        )



    print(

        "\nRegistration completed!"

    )