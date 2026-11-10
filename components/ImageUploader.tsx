"use client";

import { useRef, useState } from "react";

async function compress(file: File): Promise<Blob> {
  if (file.type === "image/gif" || file.type === "image/svg+xml") return file;
  try {
    const bmp = await createImageBitmap(file);
    const max = 1600;
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.86));
    return blob ?? file;
  } catch {
    return file;
  }
}

async function upload(file: File): Promise<string> {
  const blob = await compress(file);
  const fd = new FormData();
  fd.append("file", blob, file.name.replace(/\.\w+$/, "") + ".jpg");
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "فشل رفع الصورة");
  return json.url as string;
}

export default function ImageUploader({
  value,
  onChange,
  multiple = false,
  label,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  multiple?: boolean;
  label: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handle(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError("");
    try {
      const urls: string[] = [];
      for (const f of Array.from(files)) urls.push(await upload(f));
      onChange(multiple ? [...value, ...urls] : urls.slice(0, 1));
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل رفع الصورة");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{label}</p>
      <div className="flex flex-wrap gap-3">
        {value.map((src, i) => (
          <div key={src + i} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-28 w-24 rounded-xl border border-gold/30 object-cover" />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="absolute -left-2 -top-2 grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-red-600 text-xs text-white"
              aria-label="حذف الصورة"
            >
              ✕
            </button>
          </div>
        ))}
        {(multiple || value.length === 0) && (
          <button
            type="button"
            disabled={busy}
            onClick={() => input.current?.click()}
            className="grid h-28 w-24 cursor-pointer place-items-center rounded-xl border-2 border-dashed border-gold/50 text-center text-xs font-bold text-gold-dark hover:bg-gold/10 disabled:opacity-60"
          >
            {busy ? "جارٍ الرفع..." : "+ رفع صورة"}
          </button>
        )}
      </div>
      <input
        ref={input}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handle(e.target.files)}
      />
      {error && <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>}
    </div>
  );
}
