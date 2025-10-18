"use client";

import { uploadUserPhoto } from "@/services/uploadProfilePhoto";
import { useState } from "react";

export default function UploadPhoto() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Choose a file first");
    try {
      const publicUrl = await uploadUserPhoto(file, "1");
      setUrl(publicUrl);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Upload
      </button>

      {url && <img src={url} alt="Uploaded" className="w-40 mt-3 rounded" />}
    </div>
  );
}
