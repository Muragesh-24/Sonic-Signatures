import librosa
import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import find_peaks


def load_audio(path):

    y, sr = librosa.load(
        path,
        sr=None
    )

    return y, sr



def compute_fft(y, sr):

    n = len(y)

    fft_values = np.fft.fft(y)

    magnitude = np.abs(fft_values)

    frequencies = np.fft.fftfreq(
        n,
        1/sr
    )


    return frequencies[:n//2], magnitude[:n//2]



def compute_spectrogram(y, sr):

    stft = librosa.stft(
        y,
        n_fft=2048,
        hop_length=512
    )

    magnitude = np.abs(stft)

    db = librosa.amplitude_to_db(
        magnitude,
        ref=np.max
    )

    return db



def detect_peaks(spectrogram):

    peaks=[]

    for frequency_bin in range(
        spectrogram.shape[0]
    ):

        row=spectrogram[frequency_bin]

        indexes,_ = find_peaks(
            row,
            distance=100,
            prominence=20
        )


        for idx in indexes:

            peaks.append(
                (
                    frequency_bin,
                    idx,
                    row[idx]
                )
            )


    # keep strongest peaks only
    peaks = sorted(
        peaks,
        key=lambda x:x[2],
        reverse=True
    )


    peaks = peaks[:5000]


    return peaks