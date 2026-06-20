"use client";

type Props = {
  result: any;
};

export default function StatsCards({ result }: Props) {
  const imageClass =
    "mt-4 w-full rounded-xl border border-zinc-700 bg-zinc-950";

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">Detected Song</p>
          <h2 className="text-xl font-bold mt-2 break-words">
            {result.song}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">Confidence</p>
          <h2 className="text-xl font-bold mt-2">
            {result.confidence}%
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">Match Score</p>
          <h2 className="text-xl font-bold mt-2">
            {result.score}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400 text-sm">Processing Time</p>
          <h2 className="text-xl font-bold mt-2">
            {result.processing_time}s
          </h2>
        </div>
      </div>

      {/* Processing Pipeline */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-2">
          Audio Identification Pipeline
        </h2>

        <p className="text-zinc-400 mb-8">
          Step-by-step visualization of the song recognition process.
        </p>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="border-l-4 border-blue-500 pl-6">
            <div className="flex items-center gap-3">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                STEP 1
              </span>

              <h3 className="font-semibold text-lg">
                Audio Uploaded
              </h3>
            </div>

            <p className="text-zinc-400 mt-2">
              Audio file successfully received and saved.
            </p>

            {(
              <div className="mt-3 text-sm text-green-400">
                Time Taken: {result.file_save_time}s
              </div>
            )}
          </div>

          {/* Step 2 */}
          {result.spectrogram && (
            <div className="border-l-4 border-purple-500 pl-6">
              <div className="flex items-center gap-3">
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                  STEP 2
                </span>

                <h3 className="font-semibold text-lg">
                  Spectrogram Generation
                </h3>
              </div>

              <p className="text-zinc-400 mt-2">
                Audio transformed into a frequency-time representation.
              </p>

              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${result.spectrogram}`}
                alt="Spectrogram"
                className={imageClass}
              />
            </div>
          )}

          {/* Step 3 */}
          {result.constellation && (
            <div className="border-l-4 border-pink-500 pl-6">
              <div className="flex items-center gap-3">
                <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded">
                  STEP 3
                </span>

                <h3 className="font-semibold text-lg">
                  Constellation Map Creation
                </h3>
              </div>

              <p className="text-zinc-400 mt-2">
                Significant spectral peaks are extracted from the spectrogram.
              </p>

              <img
               width="600"
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${result.constellation}`}
                alt="Constellation Map"
                className={imageClass}
              />
            </div>
          )}

          {/* Step 4 */}
          <div className="border-l-4 border-yellow-500 pl-6">
            <div className="flex items-center gap-3">
              <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                STEP 4
              </span>

              <h3 className="font-semibold text-lg">
                Fingerprint Generation
              </h3>
            </div>

            <p className="text-zinc-400 mt-2">
              Unique audio fingerprints are generated from constellation peaks.
            </p>

            <div className="mt-3 text-sm text-green-400">
              Time Taken: {result.fingerprint_time}s
            </div>
          </div>

          {/* Step 5 */}
          <div className="border-l-4 border-orange-500 pl-6">
            <div className="flex items-center gap-3">
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                STEP 5
              </span>

              <h3 className="font-semibold text-lg">
                Database Matching
              </h3>
            </div>

            <p className="text-zinc-400 mt-2">
              Generated fingerprints are matched against the song database.
            </p>

            <div className="mt-3 text-sm text-green-400">
              Time Taken: {result.matching_time}s
            </div>
          </div>

          {/* Step 6 */}
          {result.histogram && (
            <div className="border-l-4 border-red-500 pl-6">
              <div className="flex items-center gap-3">
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  STEP 6
                </span>

                <h3 className="font-semibold text-lg">
                  Offset Histogram Analysis
                </h3>
              </div>

              <p className="text-zinc-400 mt-2">
                Histogram peak determines the strongest song match.
              </p>

              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${result.histogram}`}
                alt="Offset Histogram"
                className={imageClass}
              />
            </div>
          )}

          {/* Final Result */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
            <h3 className="text-green-400 text-xl font-bold">
              🎵 Song Identified Successfully
            </h3>

            <p className="text-2xl font-bold mt-3">
              {result.song}
            </p>

            <p className="text-zinc-400 mt-2">
              Confidence Score: {result.confidence}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}