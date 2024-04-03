import { ReactElement } from "react";

export function Link({ href, children }: {
  href: string,
  children: ReactElement | string
}) {
  return <a href={href} className=" text-cyan-800 underline hover:text-cyan-900 dark:text-cyan-400 dark:hover:text-cyan-500 ">
    {children}
  </a>;
}