import { initializeSupabaseClient } from "@/app/actions"
import { redirect } from "next/navigation"


async function getOriginalURL(shortKey: string) {
  const client = await initializeSupabaseClient()

  const { data, error } = await client.from('links').update({ lastTimeUsed: new Date() } ).eq('shortKey', shortKey).select()
  if (error || !data.length) return "/404"

  return data[0].originalURL
}

export default async function Page({ params }: { params: { shortKey: string } }) {
  const originalURL = await getOriginalURL(params.shortKey)

  redirect(originalURL)
}