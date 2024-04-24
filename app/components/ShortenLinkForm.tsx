import { useState } from "react";
import { SHORTEN_LINK_INITIAL_STATE, formatURL } from "../lib/utils";
import { Button } from "./Button";
import Loader from "./Loader";

export function ShortenLinkForm({ setShortLink, shortLink }: { setShortLink: any, shortLink: any }) {
  'use client'
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleShortenLink(e: any) {
    try {
      e.preventDefault();
      setShortLink(SHORTEN_LINK_INITIAL_STATE)
      setIsSubmitting(true)

      const res = await fetch(`/shorten?link=${e.target[0].value}`)
      const data = await res.json()

      setShortLink(data);
      setIsSubmitting(false)
      e.target.reset();
    } catch (error) {
      setIsSubmitting(false)

      console.log(error)
    }
  }

  return <>
    <form onSubmit={handleShortenLink} className="grid sm:grid-cols-[1fr_auto] items-end gap-3">
      <div className="flex gap-2 p-2 py-3 border-gray-500 border bg-zinc-900 rounded-lg focus-within:border-gray-200 hover:cursor-text" onClick={() => {
        const input = document.querySelector('#link') as HTMLInputElement
        input.focus()
      }}>
        <svg className=" mx-2 text-zinc-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
        <input className=" flex-1 bg-transparent placeholder-zinc-500 outline-none"
          type="url"
          name="link"
          id="link"
          pattern="https?://.*"
          placeholder="Enter your link here..."
          required />
      </div>
      <Button type="submit">Create a link</Button>
      <div className="flex relative gap-2 p-2 py-3 rounded-lg border border-gray-500  outline-none focus-within:border-gray-200 hover:cursor-text bg-zinc-900 max-h-[50px] ">
        <svg className=" mx-2 text-zinc-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" /><path d="m21 3-9 9" /><path d="M15 3h6v6" /></svg>
        <input
          className="flex-1 rounded-lg outline-none  placeholder-zinc-500 bg-transparent"
          type="text" name="output" id="output"
          readOnly
          value={shortLink.shortKey && formatURL({ shortKey: shortLink.shortKey })}
          placeholder="Here will appear the shortened link..."
        />
        <Button className="border-0 transition-colors hover:bg-zinc-700 focus:bg-zinc-700 absolute right-1 h-min top-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
        </Button>
      </div>
    </form>

    {isSubmitting && <Loader />}
  </>
}