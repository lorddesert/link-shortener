import { ShortenLinkForm } from "./components/ShortenLinkForm";
// import { LastTenLinksCreated } from "./components/LastTenLinksCreated";
import { Toaster } from "sonner";
import { IsBeingDevWrapper } from "./components/IsBeingDevWrapper";
import { LinkItem } from "./components/LinkItem";
import { ILinkItem } from "./lib/utils";

export default async function Home() {
  const response = await fetch(`http://localhost:3000/api/links/get/last-ten`, { cache: 'no-store' })
  const lastTenLinksCreated = await response.json()

  return (
    <div className="last-ten-links-created mt-4">
      {/* <LastTenLinksCreated /> */}
      <IsBeingDevWrapper>
        <ul className="flex flex-wrap gap-4 ">
          {lastTenLinksCreated.data.map((link: ILinkItem) => (
            <LinkItem link={link} key={`${link.id}`} />
          )
          )}
        </ul>
      </IsBeingDevWrapper>
    </div>
  );
}