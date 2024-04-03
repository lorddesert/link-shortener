import { getAllLinks } from "../route"
import { redirect } from "next/navigation"


async function getShortLink(link: string) {
  const allLinks = await getAllLinks()

  //@ts-ignore
  return Object.entries(allLinks).find(kv => kv[1].slice(-6) === link)
}

export default async function Page({ params }: { params: { link: string } }) {
  //@ts-ignore
  const [originalLink] = await getShortLink(params.link)

  redirect(originalLink)
  // return (
  //   <div>
  //     <h2>Your shorten link is : <a className="hover:underline text-blue-400" href={originalLink}>{shortenLink}</a></h2>
  //     <h3>Original Link: <a className="hover:underline text-blue-400" href={originalLink}>{ originalLink }</a></h3>
  //   </div>
  // )
}