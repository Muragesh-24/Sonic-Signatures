
import csv
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from audio_processing import *
from fingerprint import *
import shutil
import os
from database import create_tables
from database_operations import insert_fingerprints
from matcher import match_song
import time
from histogram import create_offset_histogram
from fastapi.staticfiles import StaticFiles
create_tables()

app = FastAPI()


app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static"
)
# FIX ME (PROD): Restrict CORS in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
os.makedirs(
    "generated",
    exist_ok=True
)

app.mount(
    "/generated",
    StaticFiles(directory="generated"),
    name="generated"
)
@app.get("/")
def home():
    return {
        "message":"Sonic Signature Backend Running"
    }







@app.post("/analyze")
async def analyze(
    audio:UploadFile=File(...)
):

    path=f"uploads/{audio.filename}"


    with open(path,"wb") as buffer:

        shutil.copyfileobj(
            audio.file,
            buffer
        )


    y,sr=load_audio(path)


    spectrogram=compute_spectrogram(
        y,
        sr
    )


    peaks=detect_peaks(
        spectrogram
    )


    hashes=generate_hashes(
        peaks
    )


    return {

        "duration":len(y)/sr,

        "peaks":
        len(peaks),

        "fingerprints":
        len(hashes)

    }
@app.post("/register")
async def register_song(
    audio:UploadFile=File(...)
):

    path=f"uploads/{audio.filename}"


    with open(path,"wb") as buffer:

        shutil.copyfileobj(
            audio.file,
            buffer
        )


    y,sr=load_audio(path)


    spec=compute_spectrogram(
        y,
        sr
    )


    peaks=detect_peaks(
        spec
    )


    hashes=generate_hashes(
        peaks
    )


    insert_fingerprints(
        hashes,
        audio.filename
    )


    return {

        "message":
        "Song registered",

        "fingerprints":
        len(hashes)

    }
@app.post("/identify")
async def identify(file: UploadFile = File(...)):

    start = time.time()

    # save file
    path = "temp.wav"

    with open(path,"wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    file_save_time = time.time() - start


    t=time.time()

    hashes = generate_fingerprints(path)
    fingerprint_time = time.time() - t

    print(
        "Fingerprint generation:",
        time.time()-t,
        "hash count:",
        len(hashes)
    )


    t=time.time()

    result = match_song(hashes)
    matching_time = time.time() - t

    print(
        "Database matching:",
        time.time()-t
    )


    print(
        "TOTAL:",
        time.time()-start
    )
    confidence = min(
        100,
        round(result["score"] / 50 * 100, 1)
    )
  
    total_time = time.time() - start
    histogram_file = create_offset_histogram(
    result["offsets"]
)
    # fix me prod
    return {
        "song": result["song"],
        "score": result["score"],
        "confidence": result["confidence"],
        "hashes": len(hashes),
        "processing_time": round(total_time, 2),
        "file_save_time": round(file_save_time, 2),
        "fingerprint_time": round(fingerprint_time, 2),
        "matching_time": round(matching_time, 2),
        "histogram": f"/generated/{histogram_file}",
        "spectrogram": "http://localhost:8000/static/spectrogram.png",
        "constellation": "http://localhost:8000/static/constellation.png"
    }
 

@app.post("/batch-identify")
async def batch_identify(
    files: list[UploadFile] = File(...)
):

    results = []

    os.makedirs(
        "batch_temp",
        exist_ok=True
    )

    for file in files:

        temp_path = os.path.join(
            "batch_temp",
            file.filename
        )

        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        hashes = generate_fingerprints(
            temp_path
        )

        match = match_song(
            hashes
        )

        prediction = ""

        if match["song"]:

            prediction = os.path.splitext(
                match["song"]
            )[0]

        results.append(
            {
                "filename": file.filename,
                "prediction": prediction
            }
        )

    csv_path = "results.csv"

    with open(
        csv_path,
        "w",
        newline="",
        encoding="utf-8"
    ) as f:

        writer = csv.writer(f)

        writer.writerow(
            [
                "filename",
                "prediction"
            ]
        )

        for row in results:

            writer.writerow(
                [
                    row["filename"],
                    row["prediction"]
                ]
            )

    return FileResponse(
        path=csv_path,
        media_type="text/csv",
        filename="results.csv"
    )

@app.delete("/cleanup")
async def cleanup_files():

    folders = [
        "batch_temp",
        "static",
        "uploads",
        "generated"
    ]

    deleted = []

    for folder in folders:

        if os.path.exists(folder):

            for filename in os.listdir(folder):

                path = os.path.join(
                    folder,
                    filename
                )

                try:
                    if os.path.isfile(path):
                        os.remove(path)

                    elif os.path.isdir(path):
                        shutil.rmtree(path)

                    deleted.append(path)

                except Exception as e:
                    print(
                        "Delete error:",
                        path,
                        e
                    )


    return {
        "message": "Cleanup completed",
        "deleted_files": deleted
    }