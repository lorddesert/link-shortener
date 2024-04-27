import { initializeSupabaseClient } from "@/app/actions"
import { NextRequest } from "next/server"

export async function DELETE(request: Request) {
  const db = await initializeSupabaseClient()
  const IDLinkToDelete = new URL(request.url).searchParams.get('id')

  await db.from('links').delete().eq('id', IDLinkToDelete)

  return new Response(`${IDLinkToDelete} deleted succesfully!`, { status: 200 })
}