// import { redirect } from "next/navigation";

import { readFile } from "fs/promises"
import { cwd } from "node:process"
import { getAllLinks } from "../route"

// export async function GET(request: Request) {
//   const params = new URL(request.url)
//   console.log(params.pathname.)
//   return Response.json({ status: 'OK' })
//   // return redirect(originalLink)
// }

async function getShortLink(link: string) {
  const allLinks = await getAllLinks()

  return Object.entries(allLinks).find(kv => kv[1].slice(-6) === link)
}

export default async function Page({ params }: { params: { link: string } }) {
  const [originalLink, shortenLink] = await getShortLink(params.link)
  return (
    <div>
      {/* {JSON.stringify(shortenLink)} */}
      <h1>Holaaaa</h1>
      <h2>Your shorten link is : <a className="hover:underline text-blue-400" href={originalLink}>{shortenLink}</a></h2>
      <h3>Original Link: <a className="hover:underline text-blue-400" href={originalLink}>{ originalLink }</a></h3>
    </div>
  )
}