import { initializeSupabaseClient } from "../actions"


export const MOCK_SHORTKEY = "GOOGLEMASX10tenMILasdasdasd asd asd asd asas"

export const SHORTEN_LINK_INITIAL_STATE = {
  originalURL: '',
  shortKey: '',
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
  const inDevEnvironment = !!process && process.env.NODE_ENV === 'development';

  return `${inDevEnvironment ? 'http://localhost:3000' : `${process.env.PROJECT_URL}` }/shorten/${shortKey}`
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
export async function shortenLink({ originalURL, shortKey }: {
  originalURL: string,
  shortKey?: string
}) {
  const client = await initializeSupabaseClient()
  const newShortKey = shortKey || await generateShortKey()

  await client.from('links').insert({
    clickCount: 0,
    lastTimeUsed: new Date(),
    originalURL,
    shortKey: newShortKey
  })

  return newShortKey
}

export interface ILinkItem {
  id: number;
  createdAt: string;
  clickCount: number;
  lastTimeUsed: string;
  originalURL: string;
  shortKey: string;
}

export const MOCK_ITEMS = [
  {
    "original_link": "https://www.goodreads.com/book/show/40961427-dune",
    "author": "Frank Herbert",
    "timestamp": "1609459200",
    "id": "1",
    "shortened_link": "https://goo.gl/1"
  },
  {
    "original_link": "https://www.goodreads.com/book/show/11.The_Hitchhiker_s_Guide_to_the_Galaxy",
    "author": "Douglas Adams",
    "timestamp": "1609459200",
    "id": "2",
    "shortened_link": "https://goo.gl/2"
  },
  {
    "original_link": "https://www.goodreads.com/book/show/3.Ender_s_Game",
    "author": "Orson Scott Card",
    "timestamp": "1609459200",
    "id": "3",
    "shortened_link": "https://goo.gl/3"
  },
  {
    "original_link": "https://www.goodreads.com/book/show/13496.1984",
    "author": "George Orwell",
    "timestamp": "1609459200",
    "id": "4",
    "shortened_link": "https://goo.gl/4"
  },
  {
    "original_link": "https://www.goodreads.com/book/show/242233.Rendezvous_with_Rama",
    "author": "Arthur C. Clarke",
    "timestamp": "1609459200",
    "id": "5",
    "shortened_link": "https://goo.gl/5"
  },
  {
    "original_link": "https://www.goodreads.com/book/show/51496.Foundation",
    "author": "Isaac Asimov",
    "timestamp": "1609459200",
    "id": "6",
    "shortened_link": "https://goo.gl/6"
  },
  {
    "original_link": "https://www.goodreads.com/book/show/77566.Neuromancer",
    "author": "William Gibson",
    "timestamp": "1609459200",
    "id": "7",
    "shortened_link": "https://goo.gl/7"
  },
  {
    "original_link": "https://www.goodreads.com/book/show/18490.Brave_New_World",
    "author": "Aldous Huxley",
    "timestamp": "1609459200",
    "id": "8",
    "shortened_link": "https://goo.gl/8"
  },
  {
    "original_link": "https://www.goodreads.com/book/show/9989.Snow_Crash",
    "author": "Neal Stephenson",
    "timestamp": "1609459200",
    "id": "9",
    "shortened_link": "https://goo.gl/9"
  },
  {
    "original_link": "https://www.goodreads.com/book/show/24280.Dune_Messiah",
    "author": "Frank Herbert",
    "timestamp": "1609459200",
    "id": "10",
    "shortened_link": "https://goo.gl/10"
  }
]