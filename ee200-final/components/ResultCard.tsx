"use client";

interface ResultProps {
    song: string;
    score: number;
    confidence: number;
    time: number;
    histogram?: string;
}

export default function ResultCard({
    song,
    score,
    confidence,
    time,
    histogram
}: ResultProps) {

    return (
        <div
            className="
            mt-8
            bg-zinc-900
            border
            border-zinc-700
            rounded-2xl
            p-6
            shadow-xl
            "
        >
            <div className="flex items-center gap-3">
                <div className="text-4xl">🎵</div>

                <div>
                    <h2 className="text-xl font-semibold">
                        Match Found
                    </h2>

                    <p className="text-sm text-zinc-400">
                        Audio fingerprint identification
                    </p>
                </div>
            </div>

            <div className="mt-6">
                <p className="text-zinc-400 text-sm">
                    Identified Song
                </p>

                <h1
                    className="
                    text-3xl
                    font-bold
                    text-green-400
                    mt-1
                    break-words
                    "
                >
                    {song}
                </h1>
            </div>

            <div
                className="
                mt-6
                grid
                grid-cols-1
                md:grid-cols-3
                gap-4
                "
            >
                <div className="bg-zinc-800 rounded-xl p-4">
                    <p className="text-zinc-400 text-sm">
                        Match Score
                    </p>

                    <p className="text-2xl font-bold">
                        {score}
                    </p>
                </div>

                <div className="bg-zinc-800 rounded-xl p-4">
                    <p className="text-zinc-400 text-sm">
                        Confidence
                    </p>

                    <p className="text-2xl font-bold text-green-400">
                        {confidence}%
                    </p>
                </div>

                <div className="bg-zinc-800 rounded-xl p-4">
                    <p className="text-zinc-400 text-sm">
                        Processing Time
                    </p>

                    <p className="text-2xl font-bold">
                        {time.toFixed(2)}s
                    </p>
                </div>
            </div>

            {histogram && (
                <div className="mt-8">
                    <h3
                        className="
                        text-lg
                        font-semibold
                        mb-3
                        "
                    >
                        Offset Histogram
                    </h3>

                    <p className="text-sm text-zinc-400 mb-4">
                        The peak in this histogram determines the final match.
                    </p>

                    <img
                        src={`http://localhost:8000${histogram}`}
                        alt="Offset Histogram"
                        className="
                        w-full
                        rounded-xl
                        border
                        border-zinc-700
                        "
                    />
                </div>
            )}
        </div>
    );
}