import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({ weight: ['600', '400'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Linq",
  description: "Link shortener made by lorddesert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster position="top-center" />
        <main className="p-10 md:p-20 max-w-4xl mx-auto">
          <header className="flex justify-center">
            <h1 className="flex justify-centertext-center mb-10 text-3xl relative">
              <span>linq</span>
            </h1>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
