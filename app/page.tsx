'use client'
import React, { ReactNode, useState } from "react";
import { ShortenLinkForm } from "./components/ShortenLinkForm";
import { MOCK_ITEMS } from "./lib/utils";
import { Button } from "./components/Button";

function IsBeingDevWrapper({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={`${className} border-4 border-rose-900 p-5 rounded-lg bg-rose-950 before:[content:'Work_in_progress'] before:mb-3 before:block`}>
      {children}
    </div>
  )
}

export default function Home() {
  const [shortLink, setShortLink] = useState({
    originalURL: '',
    shortKey: '',
    alreadyExists: undefined
  })

  return (
    <main className="p-10 md:p-20 max-w-4xl mx-auto font-poppins-regular">
      <div className="flex justify-center">
        {/* <h1 className="text-6xl mb-12 text-center font-bold bg-gradient-to-r from-[var(--highlight)] to-[var(--highlight2)] text-transparent bg-clip-text inline-block mx-auto">L<span className="opacity-40">inq</span>RL</h1> */}
        <h1 className="text-5xl mb-32 font-bold">Linq</h1>
      </div>
      <h2 className="text-2xl text-balance text-center font-semi-bold mb-4">The Simplest URL Shortener You Were Wainting For</h2>
      <ShortenLinkForm setShortLink={setShortLink} shortLink={shortLink} />
      {/* {shortLink.originalURL && NewLinkCard(shortLink)} */}
      <section className="last-ten-links-created mt-4">
        <IsBeingDevWrapper className="w-max">
          <ul className="grid gap-4 max-w-md ">
            {MOCK_ITEMS.map(item => {
              return (
                <li key={`link-${item.id}`} className=" grid items-center grid-cols-[auto,1fr,auto,auto] rounded-lg gap-4 w-full bg-zinc-800 border border-gray-500 p-2 ">
                  <div className="rounded-full w-10 h-10 bg-slate-500"></div>
                  <a href="https://www.google.com" className="underline hover:text-slate-300 max-w-md truncate">
                    DescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcionDescripcion Descripcion Descripcion DescripcionDescripcionDescripcion
                  </a>

                  <div className="flex gap-1">
                    <GhostButton>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                    </GhostButton>

                    {/* <GhostButton>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                    </GhostButton> */}
                  </div>
                </li>
              )
            }
            )}
          </ul>
        </IsBeingDevWrapper>
      </section>
    </main>
  );
}

function GhostButton({ children }: { children: ReactNode }) {
  return (
    <Button variant="ghost" className="hover:bg-red-500 hover:bg-opacity-60" >
      {children}
    </Button>
  )
}