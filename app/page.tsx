'use client'
import React, { ReactElement, useState } from "react";
import { Link } from "@/app/components/Link";
import { CopyButton } from "@/app/components/CopyButton";
const URL = `http://localhost:3000`

export default function Home() {
  const message = ""
  const [shortLink, setShortLink] = useState({
    originalURL: '',
    newURL: '',
    alreadyExists: undefined
  })

  return (
    <main className="p-24">
      <h1 className="text-3xl mb-12">Link Shortener</h1>
      <div className="">
        <form onSubmit={handleShortenLink}>
          <label htmlFor="url" className="block mb-2">URL</label>
          <input className="text-black p-2 rounded mr-2" type="url" name="link" id="link" pattern="https?://.*" placeholder="https://www.google.com" required />
          <button className="p-2 bg-white hover:bg-[#efefef] transition-colors text-black rounded" type="submit">Short link!</button>
        </form>
      </div>
      {shortLink.originalURL && <div className={`flex gap-4 px-2 py-1 mr-3 bg-slate-100 dark:bg-violet-950  rounded mt-10 border-l-8
        ${shortLink.alreadyExists ? 'border-blue-600' : 'border-teal-700'}
      `}>
        <hgroup>
          {shortLink.alreadyExists
            ? <h2 className=" text-2xl">Link found!</h2>
            : <h2 className=" text-2xl">Link created!</h2>
          }
          <Link href={shortLink.newURL}>
            {shortLink.newURL}
          </Link>
        </hgroup>
        <CopyButton URL={shortLink.newURL} />
      </div>
      }
    </main>
  );

  async function handleShortenLink(e: any) {
      e.preventDefault();
      const res = await (await fetch(`${URL}/shorten?link=${e.target[0].value}`)).json();
      setShortLink(res);

      e.target.reset();
  }
}