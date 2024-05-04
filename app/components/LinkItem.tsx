import { ILinkItem, MOCK_SHORTKEY } from "../lib/utils";
import { formatURL } from "../actions";

// Components
import { CopyLinkButton } from "./CopyLinkButton";

export async function LinkItem({ link }: { link: ILinkItem }) {
  const shortenedLink = await formatURL({ shortKey: link.shortKey })

  return (
    // <li className=" min-w-fit max-w-sm flex items-center justify-between rounded-lg gap-8 bg-zinc-800 border border-gray-500 px-6 py-4 text-sm ">
    <li className=" grid grid-cols-[minmax(15ch,1fr)_auto] rounded-lg gap-8 bg-zinc-800 border border-gray-500 text-sm p-2 ">
      <section>
        <a href={shortenedLink} className="underline hover:text-slate-300">
          <h2 className="truncate max-w-[15ch]">{link.shortKey || MOCK_SHORTKEY}</h2>
        </a>
        <p className="opacity-50 truncate">{link.originalURL}</p>
      </section>
      <section className="flex gap-1">
        <CopyLinkButton shortenedLink={shortenedLink} />
        {/* //TODO: implement delete? */}
        {/* <Button variant="danger" onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
        </Button> */}
      </section>
    </li>
  )
}