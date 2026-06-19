from audio_processing import *


file="A Day In The Life.mp3"


y,sr=load_audio(file)


print(
"Samples:",
len(y)
)


print(
"Sample rate:",
sr
)


spec=compute_spectrogram(
    y,
    sr
)


peaks=detect_peaks(
    spec
)


print(
"Detected peaks:",
len(peaks)
)