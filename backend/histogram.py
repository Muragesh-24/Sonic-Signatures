import os
import uuid

import matplotlib.pyplot as plt


def create_offset_histogram(offsets):

    os.makedirs(
        "generated",
        exist_ok=True
    )

    filename = f"offset_{uuid.uuid4().hex}.png"

    path = os.path.join(
        "generated",
        filename
    )

    plt.figure(figsize=(8, 4))

    plt.hist(
        offsets,
        bins=100
    )

    plt.title("Offset Histogram")

    plt.xlabel("Offset")

    plt.ylabel("Matches")

    plt.tight_layout()

    plt.savefig(path)

    plt.close()

    return filename