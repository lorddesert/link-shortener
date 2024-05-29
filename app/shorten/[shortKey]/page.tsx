import { initializeSupabaseClient } from "@/app/actions"
import { redirect } from "next/navigation"


async function getOriginalURL(shortKey: string) {
  const client = await initializeSupabaseClient()
  const { data, error } = await client.from('links').update({ lastTimeUsed: new Date() }).eq('shortKey', shortKey).select()

  if (error || !data) {
    console.log({ error, data })
    return '/404'
    //TODO: do something with the error
  }

  return data[0].originalURL
}

export default async function Page({ params }: { params: { shortKey: string } }) {
  const originalURL = await getOriginalURL(params.shortKey)
  redirect(originalURL)
}