import { initializeSupabaseClient } from "../../../../lib/initializeSupabaseClient"

export async function GET() {
  const db = initializeSupabaseClient()
  const data = await db.from('links').select('*').order('createdAt', {
    ascending: false
  })
  return Response.json(data)
}