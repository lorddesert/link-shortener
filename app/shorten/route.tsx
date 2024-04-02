import { readFile, writeFile } from "fs/promises"
import { cwd } from "process"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const originalURL = searchParams.get('link') || ''
  const allLinks = await getAllLinks()
  const shortenLinkAlreadyExists = allLinks[originalURL]

  if (shortenLinkAlreadyExists)
    return Response.json({ originalURL, newURL: shortenLinkAlreadyExists })

  const newShortenLink = await shortenLink(originalURL, allLinks)
  return Response.json({ originalURL, newURL: newShortenLink })
}


async function generateShortKey() {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const keyLength = 6 // Why 6?F

  return Array.from({ length: keyLength }, () => {
    const randomIndex = Math.floor(Math.random() * charset.length)
    return charset[randomIndex]
  })
    .reduce((acum, curr) => acum + curr, "")
}

async function shortenLink(originalURL: string, allLinks: any) {
  const newShortKey = await generateShortKey()
  const newShortenLink = `http://localhost:3000/shorten/${newShortKey}`

  await saveLinks(allLinks, originalURL, newShortenLink)
  console.log(newShortenLink)
  return newShortenLink
}

async function saveLinks(allLinks: any, originalURL: string, newShortenLink: string) {
  const NEW_JSON_DATA = {
    links: {
      ...allLinks,
      [originalURL]: newShortenLink
    }
  }

  await writeFile(`${cwd()}/app/shorten/links.json`, JSON.stringify(NEW_JSON_DATA), { encoding: 'utf-8' })
}

export async function getAllLinks() {
  const data = JSON.parse(
    await readFile(`${cwd()}/app/shorten/links.json`, { encoding: 'utf-8' })
  )
  return data.links
}
