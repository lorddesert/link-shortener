'use client'

import { useState } from "react";
import { SHORTEN_LINK_INITIAL_STATE, generateShortKey } from "../lib/utils";
import { verifyShortKeyAlreadyExists, formatURL } from '@/app/actions'

// Components
import { Button } from "./Button";
import Loader from "./Loader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CopyLinkButton } from "./CopyLinkButton";

export function ShortenLinkForm() {
  const [shortLink, setShortLink] = useState({
    originalURL: '',
    shortKey: '',
    alreadyExists: undefined
  })
  const [newShortenedLink, setNewShortenedLink] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  async function handleShortenLink(formData: FormData) {
    try {
      const originalURL = formData.get('link') as string
      const shortKey = formData.get('short-key') as string

      if (await verifyShortKeyAlreadyExists({ shortKey })) {
        setIsSubmitting(false)

        toast.error('That short key is already in use, try a different one!')
        return
      }

      setIsSubmitting(true)

      const res = await fetch(`/shorten`, {
        method: 'POST',
        body: JSON.stringify({
          originalURL,
          shortKey
        })
      })

      const newshortLink = await res.json()

      setNewShortenedLink(await formatURL({ shortKey: newshortLink.shortKey}))
      setShortLink(SHORTEN_LINK_INITIAL_STATE)
      setShortLink(newshortLink)
      setIsSubmitting(false)
      toast.success('Link shortened successfully!')
      router.refresh()

    } catch (error) {
      setIsSubmitting(false)

      //TODO: error handling?
      console.log(error)
    }
  }

  async function handleGenerateRandomShortKey(e: any) {
    const shortKeyInput = document.querySelector('#short-key') as HTMLInputElement
    const randomShortKey = await generateShortKey()
    shortKeyInput.value = randomShortKey
  }

  return <>
    {/*TODO: Show errors on forms  */}
    {/* @ts-ignore */}
    <form action={handleShortenLink} className="grid items-end gap-3">
      <div className="flex gap-2 p-2 py-3 border-gray-500 border bg-zinc-900 rounded-lg focus-within:border-gray-200 hover:cursor-text" onClick={() => {
        const input = document.querySelector('#link') as HTMLInputElement
        input.focus()
      }}>
        <svg className=" mx-2 text-zinc-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
        <input className=" flex-1 bg-transparent placeholder-zinc-500 outline-none"
          type="url"
          name="link"
          id="link"
          pattern="https?://.*"
          placeholder="Enter your link here..."
          required />
      </div>
      <div className="flex relative gap-2 p-2 py-3 border-gray-500 border bg-zinc-900 rounded-lg focus-within:border-gray-200 hover:cursor-text" onClick={() => {
        const input = document.querySelector('#short-key') as HTMLInputElement
        input.focus()
      }}>
        <svg className=" mx-2 text-zinc-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="12" r="3" /><path d="M10 9v6" /><circle cx="17" cy="12" r="3" /><path d="M14 7v8" /></svg>
        <input className=" flex-1 bg-transparent placeholder-zinc-500 outline-none"
          type="text"
          name="short-key"
          id="short-key"
          placeholder="Short key"
          minLength={3}
          required />
        <Button type="button" onClick={handleGenerateRandomShortKey} className="border-0 transition-colors hover:bg-zinc-700 focus:bg-zinc-700 absolute right-1 h-min top-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
        </Button>
      </div>
      <Button type="submit">Create a link</Button>

      <div className="flex items-center gap-2 p-2 py-3 rounded-lg border border-gray-500  outline-none focus-within:border-gray-200 hover:cursor-text bg-zinc-900 max-h-[50px] ">
        <svg className=" mx-2 text-zinc-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" /><path d="m21 3-9 9" /><path d="M15 3h6v6" /></svg>
        <input
          className="flex-1 rounded-lg outline-none  placeholder-zinc-500 bg-transparent"
          type="text" name="output" id="output"
          readOnly
          value={newShortenedLink}
          placeholder="Here will appear the shortened link..."
        />
        <CopyLinkButton shortenedLink={newShortenedLink} />
      </div>
      {/* //TODO: implement auth for deleting? */}
      {/* <div className="flex relative gap-2 p-2 py-3 rounded-lg border border-gray-500  outline-none focus-within:border-gray-200 hover:cursor-text bg-zinc-900 max-h-[50px] ">
      <svg className=" mx-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <input
          className="flex-1 rounded-lg outline-none  placeholder-zinc-500 bg-transparent"
          type="text" 
          name="auth" 
          id="auth"
          placeholder="Auth"
        />
        <Button className="border-0 transition-colors hover:bg-zinc-700 focus:bg-zinc-700 absolute right-1 h-min top-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
        </Button>
      </div> */}
    </form>

    {isSubmitting && <Loader />}
  </>
}
