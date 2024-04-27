import { initializeSupabaseClient } from "../lib/initializeSupabaseClient"
import { ILink, ILinkItem, shortenLink } from "../lib/utils"
import { verifyShortKeyAlreadyExists } from "../actions"
export async function POST(request: Request) {
  const client = initializeSupabaseClient()
  const {
    shortKey,
    originalURL
  }: {
    shortKey: string,
    originalURL: string
  } = await request.json()

  // const { data: linkData }: {
  //   data: any
  // } = await client.from('links').select('*').eq('originalURL', originalURL)
  // const linkAlreadyExist = linkData && linkData.length

  if (await verifyShortKeyAlreadyExists({ shortKey }))
    return Response.json({ originalURL, shortKey: `${shortKey}`, alreadyExists: true })

  await shortenLink({
    originalURL,
    shortKey
  })
  
  return Response.json({ originalURL, shortKey, alreadyExists: false })
}