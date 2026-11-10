"use client";

import type { ReactNode } from "react";

export default function ConfirmButton({
  message,
  children,
  className = "",
}: {
  message: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
