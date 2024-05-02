'use client'
import { ILinkItem, MOCK_SHORTKEY, formatURL } from "../lib/utils";
import { Button } from "./Button";
import { handleDeleteLink } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LinkItem({ link }: { link: ILinkItem }) {
  //TODO: It should show the shorkey as the the title, the originalURL as the subtitle?? maybe just a CTA saying copy original URL? xD IDK
  //clicakbe h1 that redirects to original URL
  // copy button doesnt work
  // finish design
  // try different layouts
  const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' })
  const shortenedLink = formatURL({ shortKey: link.shortKey })
  const router = useRouter()


  async function handleDelete() {
    await handleDeleteLink({ link })

    router.refresh()

    toast('Link deleted!')
  }

  return (
    <li className=" min-w-fit max-w-sm flex items-center justify-between rounded-lg gap-8 bg-zinc-800 border border-gray-500 px-6 py-4 text-sm ">
      <hgroup className="flex gap-5 items-center">
        <div>
          <a href={shortenedLink} className="underline hover:text-slate-300">
            <h2 className="truncate max-w-[15ch]">{link.shortKey || MOCK_SHORTKEY}</h2>
          </a>
          <h2 className="opacity-50 max-w-xs truncate">{link.originalURL}</h2>
        </div>
        {/* <div>
          <p className="text-white">Created: {formatter.format(new Date(link.createdAt))}</p>
          <p className="text-white">Last use: {formatter.format(new Date(link.lastTimeUsed))}</p>
        </div> */}
      </hgroup>

      <div className="flex gap-1">
        <Button variant="ghost" onClick={() => navigator.clipboard.writeText(shortenedLink)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
        </Button>

        {/* <GhostButton>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
</GhostButton> */}
      </div>
    </li>
  )
}