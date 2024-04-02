'use client'
import { useState } from "react";
const URL = `http://localhost:3000`

export default function Home() {
  const message = ""
  const [shortLink, setShortLink] = useState('')

  return (
    <main className="p-24 w-full flex-column justify-center">
      <h1 className=" text-3xl mb-12">Link Shortener</h1>
      <form onSubmit={async (e: any) => {
        e.preventDefault()
        const res = await (await fetch(`${URL}/shorten?link=${e.target[0].value}`)).json()
        console.log(res)
        setShortLink(res.newURL)
      }}>
        <label htmlFor="url" className="block mb-2">URL</label>
        <input className="text-black p-2 rounded mr-2" type="url" name="link" id="link" pattern="https?://.*" placeholder="https://www.google.com" />

        <button className="p-2 bg-white hover:bg-[#efefef] transition-colors text-black rounded" type="submit">Short link!</button>
      </form>
      {shortLink && <div className=" w-min-content flex gap-4 px-2 py-1 mr-3 text-black  bg-gray-300 rounded border mt-10">
          <h3 className="text-2xl">{shortLink}</h3>
        <CopyButton shortLink={shortLink} />
        </div>}
    </main>
  );
}
function CopyButton({ shortLink }) {
  const [copied, setCopied] = useState(false)
  return <button className="bg-gray-400 p-1 rounded" onClick={() => {
    navigator.clipboard.writeText(shortLink);
    console.log(shortLink)
    setCopied(true)

    setTimeout(() => {

      setCopied(false)
    }, 2000)
  }}>
    {copied
      ? <span>Copied✅</span>
      : <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
    }
  </button>;
}

