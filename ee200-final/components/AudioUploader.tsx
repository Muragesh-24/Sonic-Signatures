"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Loader2 } from "lucide-react";
import {saveSongHistory} from "@/utils/history";
export default function AudioUploader({
  setResult,
}: {
  setResult: (data: any) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const loadingMessages = [
    "Receiving audio file...",
    "Generating spectrogram...",
    "Extracting audio fingerprints...",
    "Searching signature database...",
    "Comparing acoustic hashes...",
    "Computing confidence score...",
    "Finding best match...",
    "Almost there..."
  ];

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setMessageIndex(
        (prev) => (prev + 1) % loadingMessages.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [loading]);

  async function identify() {
    if (!file) {
      alert("Please select an audio file");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();

    formData.append("file", file);

    const start = Date.now();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/identify`,
        formData
      );

      const end = Date.now();

      setResult({
        ...response.data,
        time: ((end - start) / 1000).toFixed(2),
      });
      if(response.data.song) {
    saveSongHistory(response.data.song);
}
    } catch (error) {
      console.error(error);
      alert("Identification failed");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div
        className="
        border-2
        border-dashed
        border-zinc-700
        hover:border-blue-500
        transition
        rounded-2xl
        p-6
        sm:p-10
        text-center
        bg-zinc-900/40
        "
      >
        <label className="cursor-pointer block">
          <Upload
            size={55}
            className="mx-auto mb-4 text-blue-500"
          />

          <h2 className="text-2xl font-semibold">
            Upload Audio File
          </h2>

          <p className="text-zinc-400 mt-2">
            MP3 upload a short audio clip (up to 30 seconds) to identify the song. Longer clips may take longer to process.
          </p>

          <div className="mt-4">
            <span
              className="
              inline-block
              px-4
              py-2
              rounded-lg
              bg-zinc-800
              text-sm
              "
            >
              Choose File
            </span>
          </div>

          <input
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
          />
        </label>

        {file && (
          <div
            className="
            mt-5
            bg-zinc-800
            rounded-lg
            p-3
            text-green-400
            break-all
            "
          >
            ✓ {file.name}
          </div>
        )}

        <button
          onClick={identify}
          disabled={loading || !file}
          className="
          mt-6
          w-full
          sm:w-auto
          bg-blue-600
          hover:bg-blue-700
          disabled:bg-zinc-700
          disabled:cursor-not-allowed
          px-8
          py-3
          rounded-xl
          font-medium
          transition
          "
        >
          {loading ? "Processing..." : "Identify Song"}
        </button>

        {loading && (
          <div className="mt-10">
            <Loader2
              size={42}
              className="
              animate-spin
              mx-auto
              text-blue-500
              "
            />

            <h3 className="mt-5 text-lg font-semibold">
              {loadingMessages[messageIndex]}
            </h3>

            <p className="text-zinc-500 mt-2">
              Audio fingerprinting can take
              10–15 seconds depending on file length.
            </p>

            <div className="mt-6 max-w-md mx-auto">
              <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="
                  h-full
                  bg-blue-500
                  animate-pulse
                  w-full
                  "
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}