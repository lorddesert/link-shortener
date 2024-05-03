import { initializeSupabaseClient } from "@/app/actions"

export async function GET() {
  const db = await initializeSupabaseClient()
  const data = await db.from('links').select('*').order('createdAt', {
    ascending: false
  })
  return Response.json(data)
}