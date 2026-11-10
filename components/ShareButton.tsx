"use client";

import { useState } from "react";
import { ShareIcon } from "./Icons";

export default function ShareButton({ title, className = "" }: { title: string; className?: string }) {
  const [done, setDone] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      window.prompt("انسخ رابط المنتج:", url);
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className={
        className ||
        "btn btn-outline"
      }
    >
      <ShareIcon />
      {done ? "تم نسخ الرابط ✓" : "مشاركة المنتج"}
    </button>
  );
}
