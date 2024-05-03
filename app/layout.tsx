import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ShortenLinkForm } from "./components/ShortenLinkForm";
import { Button } from "./components/Button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        <header className="p-2 flex justify-between sticky top-0 z-50 backdrop-filter backdrop-blur-sm">
          <Link href="/">
            <h1 className="text-xl">
              lord<span className="text-cyan-500 underline">links</span>
            </h1>
          </Link>
          {/* <Button variant="ghost">Login</Button> */}
        </header>
        <main className="p-10 md:p-20 max-w-4xl mx-auto font-poppins-regular">
          {children}
        </main>
      </body>
    </html>
  );
}
