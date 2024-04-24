import { initializeSupabaseClient } from "@/app/lib/initializeSupabaseClient"
import { redirect } from "next/navigation"


async function getShortLink(shortKey: string) {
  const client = initializeSupabaseClient()

  const { data } = await client.from('links').select("*").eq("shortKey", shortKey)
  if (!data) return "/404"

  return data[0].originalURL
}

export default async function Page({ params }: { params: { shortKey: string } }) {
  //@ts-ignore
  const originalURL = await getShortLink(params.shortKey)

  redirect(originalURL)
}