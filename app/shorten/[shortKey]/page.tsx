import { initializeSupabaseClient } from "@/app/actions"
import { redirect } from "next/navigation"


async function getOriginalURL(shortKey: string) {
  const client = await initializeSupabaseClient()

  const { data, error } = await client.from('links').update({ lastTimeUsed: new Date() } ).eq('shortKey', shortKey).select()
  console.log({error, data})

  if (error) {
    //TODO: do something with the error
  }

  if (data?.length) {
    return data[0].originalURL
  }

  return "/404"
}

export default async function Page({ params }: { params: { shortKey: string } }) {
  const originalURL = await getOriginalURL(params.shortKey)

  redirect(originalURL)
}