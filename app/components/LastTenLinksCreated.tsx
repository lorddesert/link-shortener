import { ILinkItem, MOCK_ITEMS, formatURL } from "../lib/utils"
import { IsBeingDevWrapper } from "./IsBeingDevWrapper"
import { LinkItem } from "./LinkItem"
export async function LastTenLinksCreated() {
  const response = await fetch(`http://localhost:3000/api/links/get/last-ten`, { cache: 'no-store'})
  const lastTenLinksCreated = await response.json()
  return (
    <IsBeingDevWrapper>
      <ul className="grid grid-cols-2 gap-4 ">
        {lastTenLinksCreated.data.map((link: ILinkItem) => (
          <LinkItem link={link} key={`${link.id}`} />
        )
        )}
      </ul>
    </IsBeingDevWrapper>

  )
}