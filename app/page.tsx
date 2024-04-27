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
    <main className="p-10 md:p-20 max-w-4xl mx-auto font-poppins-regular">
      <Toaster position="top-center" />
      <div className="flex justify-center">
        {/* <h1 className="text-6xl mb-12 text-center font-bold bg-gradient-to-r from-[var(--highlight)] to-[var(--highlight2)] text-transparent bg-clip-text inline-block mx-auto">L<span className="opacity-40">inq</span>RL</h1> */}
        <h1 className="text-5xl mb-32 font-bold">Linq</h1>
      </div>
      <h2 className="text-2xl text-balance text-center font-semi-bold mb-4">The Simplest URL Shortener You Were Wainting For</h2>
      <ShortenLinkForm />
      {/* {shortLink.originalURL && NewLinkCard(shortLink)} */}
      <section className="last-ten-links-created mt-4">
        {/* <LastTenLinksCreated /> */}
        <IsBeingDevWrapper>
          <ul className="flex flex-wrap gap-4 ">
            {lastTenLinksCreated.data.map((link: ILinkItem) => (
              <LinkItem link={link} key={`${link.id}`} />
            )
            )}
          </ul>
        </IsBeingDevWrapper>
      </section>
    </main>
  );
}