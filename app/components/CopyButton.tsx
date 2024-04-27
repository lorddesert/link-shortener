'use client'
import { useState } from "react";
import { formatURL } from "../lib/utils";
import { Button } from "./Button";

export function CopyButton({
  shortKey,
  className: cn
}: {
  shortKey: string,
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  return <Button
    type="button"
    variant="ghost"
    disabled={!shortKey}
    className={`border-gray-500 border bg-zinc-900 rounded-lg h-full p-2 disabled:bg-zinc-700 disabled:text-zinc-300 disabled:cursor-not-allowed ${cn}`}
    onClick={() => {
      if (!shortKey) return

      navigator.clipboard.writeText(formatURL({ shortKey }));
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }}>
    {copied
      ? <span>Copied✅</span>
      : <div className="flex gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
        <span className="flex-1">Copy</span>
      </div>
    }
  </Button>;
}