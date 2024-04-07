import { initializeSupabaseClient } from "./initializeSupabaseClient"

export const SHORTEN_LINK_INITIAL_STATE = {
  originalURL: '',
  newURL: '',
  alreadyExists: undefined
}

export interface ILink {
  id: string
  newURL: string
  originalURL: string
  clickCount: number
  shortKey: string
}

export function formatURL({ shortKey }: {
  shortKey: string
}) {
  return `${window.location.origin}/shorten/${shortKey}`
}

export async function generateShortKey() {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const keyLength = 6 // Why 6?F

  return Array.from({ length: keyLength }, () => {
    const randomIndex = Math.floor(Math.random() * charset.length)
    return charset[randomIndex]
  })
    .reduce((acum, curr) => acum + curr, "")
}


/**
 * Creates a new shorten links and returns the new short key
 * @returns 
 */
export async function shortenLink({ originalURL }: {
  originalURL: string,
}) {
  const client = initializeSupabaseClient()
  const newShortKey = await generateShortKey()

  await client.from('links').insert({
    clickCount: 0,
    lastTimeUsed: new Date(),
    originalURL,
    shortKey: newShortKey
  })

  return newShortKey
}