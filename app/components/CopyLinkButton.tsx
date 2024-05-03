'use client'
import { useState } from "react"
import { Button } from "./Button"

export function CopyLinkButton({ shortenedLink }: { shortenedLink: string }) {
  const [clicked, setClicked] = useState(false)

  return (
    <Button disabled={clicked} variant="ghost" onClick={() => {
      
      setClicked(true)
      navigator.clipboard.writeText(shortenedLink)
      setTimeout(() => {
        setClicked(false)
      }, 1400)
      }}>
      {clicked
        ? <p> copied ✅</p>
        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
      }

    </Button>
  )
}