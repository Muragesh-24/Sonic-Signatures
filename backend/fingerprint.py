import hashlib
from visualization import (
    save_spectrogram,
    save_constellation
)
from audio_processing import compute_spectrogram, detect_peaks, load_audio




def generate_hashes(peaks):

    fingerprints = []


    for i in range(len(peaks)):

        f1, t1, _ = peaks[i]


        # pair current peak with next few peaks
        for j in range(
            i + 1,
            min(i + 6, len(peaks))
        ):

            f2, t2, _ = peaks[j]


            delta = t2 - t1


            # ignore very far peaks
            if delta > 200:
                continue


            hash_value = hashlib.sha1(
                f"{f1}|{f2}|{delta}".encode()
            ).hexdigest()


            fingerprints.append(
                (
                    hash_value,
                    t1
                )
            )


    return fingerprints

def generate_fingerprints(path):

    y, sr = load_audio(path)

    spectrogram = compute_spectrogram(
        y,
        sr
    )

    peaks = detect_peaks(
        spectrogram
    )

    fingerprints = generate_hashes(
        peaks
    )
    save_spectrogram(
        spectrogram,
        "static/spectrogram.png"
    )

    save_constellation(
        peaks,
        "static/constellation.png"
    )

    return fingerprints