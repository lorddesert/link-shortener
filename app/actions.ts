"use server"

import { createClient } from '@supabase/supabase-js'
import { ILinkItem } from './lib/utils'

const supabaseUrl = 'https://jowtcsoardnhxsudbsmz.supabase.co'

export async function initializeSupabaseClient() {
  return createClient(supabaseUrl, process.env.SUPABASE_API_KEY!)
}

export async function verifyShortKeyAlreadyExists({ shortKey }: { shortKey: string }) {
  const client = await initializeSupabaseClient()
  const { data, error } = await client.from('links').select('shortKey').eq('shortKey', shortKey)

  if (!error) return Boolean(data?.length)

  //TODO: Error handling here, I don't know what supabase throws if it's not working properly.
  return error
}

export async function handleDeleteLink({ link }: { link: ILinkItem }) {
  const response = await fetch(`http://localhost:3000/api/links/delete/?${new URLSearchParams({id: `${link.id}`})}`, {
    method: 'DELETE',
  })
}