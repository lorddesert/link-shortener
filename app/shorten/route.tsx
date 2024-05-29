import {shortenLink} from "../lib/utils"
import {verifyShortKeyAlreadyExists} from "../actions"

export async function POST(request: Request) {
    const {
        shortKey,
        originalURL
    }: {
        shortKey: string,
        originalURL: string
    } = await request.json()

    if (await verifyShortKeyAlreadyExists({shortKey}))
        return Response.json({originalURL, shortKey: `${shortKey}`, alreadyExists: true})

    await shortenLink({
        originalURL,
        shortKey
    })

    return Response.json({originalURL, shortKey, alreadyExists: false})
}