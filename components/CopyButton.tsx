"use client";

import { useState } from "react";
import { CopyIcon } from "./Icons";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}

export default function CopyButton({
  text,
  label = "نسخ الكود",
  doneLabel = "تم النسخ ✓",
  iconOnly = false,
  className = "",
}: {
  text: string;
  label?: string;
  doneLabel?: string;
  iconOnly?: boolean;
  className?: string;
}) {
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={async () => {
        if (await copyText(text)) {
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        }
      }}
      className={
        className ||
        "inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-3 py-2 text-xs font-bold text-ink transition hover:bg-gold/10"
      }
    >
      <CopyIcon />
      {!iconOnly && <span>{done ? doneLabel : label}</span>}
      {iconOnly && done && <span className="text-[11px]">✓</span>}
    </button>
  );
}
