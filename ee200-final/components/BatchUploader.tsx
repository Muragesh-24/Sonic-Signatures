"use client";

import { useState } from "react";
import axios from "axios";
import { Upload, Loader2, Download } from "lucide-react";

export default function BatchUploader() {
const [files, setFiles] = useState<File[]>([]);
const [loading, setLoading] = useState(false);

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
    "http://localhost:8000/batch-identify",
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

return ( <div
   className="
   bg-zinc-900
   border
   border-zinc-800
   rounded-xl
   p-8
   mt-8
 "
 > <h2
     className="
     text-2xl
     font-bold
     mb-4
   "
   >
Batch Mode </h2>

```
  <p
    className="
    text-zinc-400
    mb-6
  "
  >
    Upload multiple audio clips and
    download results.csv
  </p>

  <div
    className="
    border-2
    border-dashed
    border-zinc-700
    rounded-xl
    p-8
    text-center
  "
  >
    <Upload
      size={40}
      className="mx-auto mb-4"
    />

    <input
      type="file"
      accept="audio/*"
      multiple
      onChange={(e) =>
        setFiles(
          Array.from(
            e.target.files || []
          )
        )
      }
    />

    {files.length > 0 && (
      <div
        className="
        mt-4
        text-left
        max-h-40
        overflow-auto
      "
      >
        <p
          className="
          font-semibold
          mb-2
        "
        >
          Selected Files:
        </p>

        {files.map((file) => (
          <p
            key={file.name}
            className="
            text-sm
            text-zinc-400
          "
          >
            {file.name}
          </p>
        ))}
      </div>
    )}

    <button
      onClick={processBatch}
      disabled={loading}
      className="
      mt-6
      flex
      items-center
      gap-2
      mx-auto
      bg-green-600
      hover:bg-green-700
      px-6
      py-3
      rounded-lg
    "
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <Download size={18} />
          Generate results.csv
        </>
      )}
    </button>
  </div>
</div>

);
}
