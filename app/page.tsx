'use client'
import React, { ReactNode, useState } from "react";
import { Link } from "@/app/components/Link";
import { CopyButton } from "@/app/components/CopyButton";
import { SHORTEN_LINK_INITIAL_STATE, formatURL } from "./lib/utils";
import Loader from "./components/Loader";

export default function Home() {
  const [shortLink, setShortLink] = useState({
    originalURL: '',
    shortKey: '',
    alreadyExists: undefined
  })

  return (
    <main className="p-24 max-w-4xl mx-auto">
      <div className="flex justify-center">
        <h1 className="text-6xl mb-12 text-center font-bold bg-gradient-to-r from-[var(--highlight)] to-[var(--highlight2)] text-transparent bg-clip-text inline-block mx-auto">L<span className="opacity-40">inq</span>RL</h1>
      </div>
      <p className=" text-lg text-center opacity-70">Convenient, Open-Source link shortener made by <Link href="https://www.lorddesert.xyz">@lorddesert</Link> </p>
      <ShortenLinkForm setShortLink={setShortLink} />
      {shortLink.originalURL && NewLinkCard(shortLink)}
    </main>
  );
}

function NewLinkCard(shortLink: { originalURL: string; shortKey: string; alreadyExists: undefined; }): React.ReactNode {
  return <div className={`flex gap-4 px-2 py-1 bg-slate-100 dark:bg-violet-950  rounded mt-10 border-l-8 max-w-lg w-fit
        ${shortLink.alreadyExists ? 'border-blue-600' : 'border-teal-600'}
      `}>
    <hgroup className="">
      {shortLink.alreadyExists
        ? <h2 className=" text-2xl">Link found!</h2>
        : <h2 className=" text-2xl">Link created!</h2>}
      <Link href={`/shorten/${shortLink.shortKey}`}>
        {`${window.location.origin}/shorten/${shortLink.shortKey}`}
      </Link>
    </hgroup>
    <CopyButton shortKey={shortLink.shortKey} />
  </div>;
}

function ShortenLinkForm({ setShortLink }: { setShortLink: any }) {
  'use client'
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleShortenLink(e: any) {
    try {
      e.preventDefault();
      setShortLink(SHORTEN_LINK_INITIAL_STATE)
      setIsSubmitting(true)

      const res = await fetch(`/shorten?link=${e.target[0].value}`)
      const data = await res.json()

      console.log(data)
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
      <div className="grid">
        <label className="block mb-2 text-center text-md opacity-60" htmlFor="url">URL</label>
        <input className="text-black p-2 rounded bg-slate-50 dark:bg-gray-900 border-2 border-gray-400 dark:border-gray-800 dark:text-slate-50"
          type="url"
          name="link"
          id="link"
          pattern="https?://.*"
          placeholder="https://www.google.com"
          required />
      </div>
      <Button>Create a link</Button>
    </form>

    {isSubmitting && <Loader />}
  </>
}

export function Button({ children, ...restOfProps }: {
  children: ReactNode
}) {
  return <button {...restOfProps} className=" p-2 h-full border-gray-500 border bg-zinc-900 rounded-lg">
    {children}
  </button>;
}

