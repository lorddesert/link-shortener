import { ShortenLinkForm } from "./components/ShortenLinkForm";
// import { LastTenLinksCreated } from "./components/LastTenLinksCreated";
import { Toaster } from "sonner";
import { IsBeingDevWrapper } from "./components/IsBeingDevWrapper";
import { LinkItem } from "./components/LinkItem";
import { ILinkItem, MOCK_ITEMS } from "./lib/utils";

export default async function Home() {
  const response = await fetch(`http://localhost:3000/api/links/get/last-ten`, { cache: 'no-store' })
  if (!response.ok) {
    //TODO: handle error 500
  }
  console.log('Home response:', response)
  const lastTenLinksCreated = await response.json()
  // const lastTenLinksCreated = response

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex justify-center">
        <h1 className="text-5xl mb-32 font-bold">Linq</h1>
      </div>
      <h2 className="text-2xl text-balance text-center font-semi-bold mb-4">The Simplest URL Shortener You Were Wainting For</h2>
      <ShortenLinkForm />
      <div className="mt-4">
        <IsBeingDevWrapper>
          <ul className="grid grid-cols-1 place-items-center md:grid-cols-2 gap-4 ">
            {MOCK_ITEMS.map((link: any) => (
              <LinkItem link={link} key={`${link.id}`} />
            )
            )}
          </ul>
        </IsBeingDevWrapper>
      </div>
    </>
  );
}