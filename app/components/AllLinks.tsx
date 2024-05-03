import { ILinkItem } from "../lib/utils"
import { IsBeingDevWrapper } from "./IsBeingDevWrapper"
import { LinkItem } from "./LinkItem"
export async function AllLinks() {
  const response = await fetch(`http://localhost:3000/api/links/get/last-ten`, { cache: 'no-store'})
  const allLinks = await response.json()
  return (
    <IsBeingDevWrapper>
      <div className="mt-4">
        <ul className="grid grid-cols-1 place-items-center md:grid-cols-2 gap-3 ">
          {allLinks.data.map((link: ILinkItem) => (
            <LinkItem link={link} key={`${link.id}`} />
          )
          )}
        </ul>
      </div>
    </IsBeingDevWrapper>

  )
}