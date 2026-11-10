"use client";

import { useState } from "react";
import { Ornament } from "./Icons";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="pattern-gold grid aspect-[4/5] w-full place-items-center rounded-3xl border border-gold/30 bg-sand">
        <Ornament className="h-24 w-24 text-gold" />
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-3xl border border-gold/30 bg-sand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[active]} alt={name} className="aspect-[4/5] w-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`overflow-hidden rounded-xl border-2 transition ${
                i === active ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={`صورة ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
