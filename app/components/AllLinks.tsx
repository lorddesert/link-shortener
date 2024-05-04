import { getAllLinks } from "../actions"
import { ILinkItem } from "../lib/utils"

// Components
import { LinkItem } from "./LinkItem"
export async function AllLinks() {
  const allLinks = await getAllLinks()  
  
  return (
    <div className="mt-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
        {allLinks.data.map((link: ILinkItem) => (
          <LinkItem link={link} key={`${link.id}`} />
        )
        )}
      </ul>
    </div>

  )
}