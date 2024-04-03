'use client'
import { useState } from "react";
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
          <a href={shortLink.newURL} className=" text-cyan-800 underline hover:text-cyan-900 dark:text-cyan-400 dark:hover:text-cyan-500 ">{shortLink.newURL}</a>
        </hgroup>
        <CopyButton shortLink={shortLink} />
      </div>
      }
    </main>
  );

  function handleShortenLink(): string | ((formData: FormData) => void) | undefined {
    return async (e: any) => {
      e.preventDefault();
      const res = await (await fetch(`${URL}/shorten?link=${e.target[0].value}`)).json();
      setShortLink(res);

      e.target.reset();
    };
  }
}
function CopyButton({ shortLink }: { shortLink: any }) {
  const [copied, setCopied] = useState(false)
  return <button onClick={() => {
    navigator.clipboard.writeText(shortLink.newURL);
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

