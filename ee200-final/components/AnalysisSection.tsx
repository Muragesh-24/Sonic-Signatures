"Use client";
type Props = {
  result: any;
};

export default function AnalysisSection({
  result,
}: Props) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">
        Processing Analytics
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400">
            File Save Time
          </p>

          <h3 className="text-2xl font-bold mt-2">
            {result.file_save_time}s
          </h3>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400">
            Fingerprint Generation
          </p>

          <h3 className="text-2xl font-bold mt-2">
            {result.fingerprint_time}s
          </h3>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <p className="text-zinc-400">
            Database Matching
          </p>

          <h3 className="text-2xl font-bold mt-2">
            {result.matching_time}s
          </h3>
        </div>

      </div>
    </section>
  );
}