import matplotlib.pyplot as plt


def save_spectrogram(spectrogram, path):

    plt.figure(figsize=(10,4))

    plt.imshow(
        spectrogram,
        aspect="auto",
        origin="lower"
    )

    plt.colorbar()

    plt.tight_layout()

    plt.savefig(path)

    plt.close()


def save_constellation(peaks, path):

    plt.figure(figsize=(10,4))

    times = [p[1] for p in peaks]
    freqs = [p[0] for p in peaks]

    plt.scatter(
        times,
        freqs,
        s=3
    )

    plt.xlabel("Time")
    plt.ylabel("Frequency Bin")

    plt.tight_layout()

    plt.savefig(path)

    plt.close()