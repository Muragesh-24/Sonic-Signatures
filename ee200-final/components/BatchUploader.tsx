"use client";

import { useState,useEffect } from "react";
import axios from "axios";
import { Upload, Loader2, Download } from "lucide-react";

export default function BatchUploader() {
const [files, setFiles] = useState<File[]>([]);
const [loading, setLoading] = useState(false);
const [stepIndex, setStepIndex] = useState(0);

const processingSteps = [
"Uploading files...",
"Generating spectrograms...",
"Extracting audio fingerprints...",
"Searching signature database...",
"Comparing acoustic hashes...",
"Computing confidence scores...",
"Finding best matches...",
"Almost there...",
"preparing results.csv...",
"please wait..."

];
useEffect(() => {
  if (!loading) return;

  const interval = setInterval(() => {
    setStepIndex((prev) =>
      prev < processingSteps.length - 1 ? prev + 1 : prev
    );
  }, 1800);

  return () => clearInterval(interval);
}, [loading]);
async function processBatch() {
if (files.length === 0) {
alert("Please select audio files");
return;
}



setLoading(true);

try {
  const formData = new FormData();
console.log("Uploading files:");

files.forEach((file) => {
  console.log(file.name);
});
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/batch-identify`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data])
  );

  const link = document.createElement("a");

  link.href = url;
  link.setAttribute(
    "download",
    "results.csv"
  );

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
} catch (error) {
  console.error(error);
  alert("Batch processing failed");
} finally {
  setLoading(false);
}


}

return ( 
  <div
  className="
  border-2
  border-dashed
  border-zinc-700
  hover:border-green-500
  transition
  rounded-xl
  p-6
  sm:p-8
  text-center
  "
>
  <label className="cursor-pointer block">
    <Upload
      size={50}
      className="mx-auto mb-4 text-green-500"
    />

    <h3 className="text-xl font-semibold">
      Upload Audio Dataset
    </h3>

    <p className="text-zinc-400 mt-2">
      Select multiple audio clips for batch identification
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
        Choose Files
      </span>
    </div>

    <input
      type="file"
      accept="audio/*"
      multiple
      className="hidden"
      onChange={(e) =>
        setFiles(Array.from(e.target.files || []))
      }
    />
  </label>

  {files.length > 0 && (
    <div
      className="
      mt-6
      bg-zinc-800
      rounded-lg
      p-4
      text-left
      max-h-48
      overflow-auto
      "
    >
      <p className="font-semibold mb-3 text-green-400">
        {files.length} files selected
      </p>

      {files.map((file) => (
        <div
          key={file.name}
          className="
          text-sm
          text-zinc-400
          truncate
          "
        >
          • {file.name}
        </div>
      ))}
    </div>
  )}

  <button
    onClick={processBatch}
    disabled={loading || files.length === 0}
    className="
    mt-6
    w-full
    sm:w-auto
    bg-green-600
    hover:bg-green-700
    disabled:bg-zinc-700
    disabled:cursor-not-allowed
    px-8
    py-3
    rounded-xl
    font-medium
    transition
    "
  >
    {loading ? (
      "Processing Dataset..."
    ) : (
      <>
        <Download
          size={18}
          className="inline mr-2"
        />
        Generate results.csv
      </>
    )}
  </button>

  {loading && (
    <div className="mt-8">
      <Loader2
        size={40}
        className="
        animate-spin
        mx-auto
        text-green-500
        "
      />

      <h3 className="mt-4 text-lg font-semibold">
        {processingSteps[stepIndex]}
      </h3>

      <p className="mt-2 text-zinc-500">
        Processing {files.length} audio files
      </p>

      <div className="mt-6 max-w-md mx-auto text-left">
        {processingSteps.map((step, idx) => (
          <div
            key={step}
            className="flex items-center gap-3 py-1"
          >
            {idx < stepIndex ? (
              <span className="text-green-500">
                ✓
              </span>
            ) : idx === stepIndex ? (
              <Loader2
                size={14}
                className="animate-spin text-green-500"
              />
            ) : (
              <span className="text-zinc-600">
                ○
              </span>
            )}

            <span
              className={
                idx <= stepIndex
                  ? "text-zinc-200"
                  : "text-zinc-500"
              }
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

);
}
