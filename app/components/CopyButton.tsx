'use client'
import { useState } from "react";
import { formatURL } from "../lib/utils";

export function CopyButton({ shortKey }: { shortKey: string }) {
  const [copied, setCopied] = useState(false)
  return <button onClick={() => {
    navigator.clipboard.writeText(formatURL({ shortKey }));
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }}>
    {copied
      ? <span>Copied✅</span>
      : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
    }
  </button>;
}