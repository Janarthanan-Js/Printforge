"use client";

import { useState } from "react";
import { FiCheck, FiShare2 } from "react-icons/fi";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:border-black transition"
    >
      {copied ? (
        <FiCheck aria-hidden="true" />
      ) : (
        <FiShare2 aria-hidden="true" />
      )}
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
