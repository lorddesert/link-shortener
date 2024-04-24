import Link from "next/link";
import { CopyButton } from "./CopyButton";

export function NewLinkCard(shortLink: { originalURL: string; shortKey: string; alreadyExists: undefined; }): React.ReactNode {
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