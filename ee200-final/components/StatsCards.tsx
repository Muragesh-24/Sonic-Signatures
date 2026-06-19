"use client";

type Props = {
  result: any;
};

export default function StatsCards({ result }: Props) {
  const cards = [
    {
      title: "Detected Song",
      value: result.song,
    },
    {
      title: "Confidence",
      value: `${result.confidence}%`,
    },
    {
      title: "Match Score",
      value: result.score,
    },
    {
      title: "Processing Time",
      value: `${result.processing_time}s`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="
            bg-zinc-900
            border
            border-zinc-800
            rounded-xl
            p-5
            "
          >
            <p className="text-zinc-400 text-sm">
              {card.title}
            </p>

            <h2 className="text-xl font-bold mt-2 break-words">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Offset Histogram */}
      {result.histogram && (
        <div
          className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-xl
          p-6
          "
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold">
              Offset Histogram
            </h2>

            <p className="text-zinc-400 text-sm mt-1">
              The dominant peak determines the matched song.
            </p>
          </div>

          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${result.histogram}`}
            alt="Offset Histogram"
            className="
            w-full
            rounded-lg
            border
            border-zinc-700
            "
          />
          <div>
    <h2>Spectrogram</h2>
    <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${result.spectrogram}`} alt="Spectrogram" />
  </div>

  <div>
    <h2>Constellation Map</h2>
    <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${result.constellation}`} alt="Constellation Map" />
  </div>
        </div>
        
      )}
    </div>
  );
}