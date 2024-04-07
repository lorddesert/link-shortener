import { readFile, writeFile } from "fs/promises"
import { cwd } from "process"
import { initializeSupabaseClient } from "../lib/initializeSupabaseClient"
import { ILink, generateShortKey, shortenLink } from "../lib/utils"
export async function GET(request: Request) {
  const client = initializeSupabaseClient()
  const originalURL = new URL(request.url).searchParams.get('link')!

  const { data }: {
    data: any
  } = await client.from('links').select('*').eq('originalURL', originalURL)

  if (!data || !data?.length) {
    console.log("OK 404: Data was falsy!")
    const newShortKey = await shortenLink({ originalURL })
    return Response.json({ originalURL, shortKey: `${newShortKey}`, alreadyExists: false })
  }

  console.log("OK 200: Link found!")
  const { shortKey } = data[0]
  return Response.json({ originalURL, shortKey: `${shortKey}`, alreadyExists: true })
}