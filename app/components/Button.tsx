import { ReactNode } from "react";

export function Button({ children, className: cn = "", type, variant = "default", ...restOfProps }: {
  children: ReactNode,
  className?: string,
  type?: "submit" | "reset" | "button" | undefined,
  variant?: "ghost" | "default"
}) {

  const a = "border-1 border-transparent transition-colors hover:bg-zinc-700 focus:border-zinc-600 h-auto bg-opacity-0 active:bg-zinc-600"
  return <button type={type || "button"} {...restOfProps} className={` 
  ${variant === 'default' && `p-2 border-gray-500 border bg-zinc-900 rounded-lg h-full outline-none focus:border-gray-200 ${cn} ` } 
  ${variant === 'ghost' &&  `p-2 border-gray-500 border bg-zinc-900 rounded-lg outline-none border-1 border-transparent transition-colors hover:bg-zinc-700 focus:border-zinc-600 h-auto bg-opacity-0 active:bg-zinc-600 ${cn} `  } 
  `}>
    {children}
  </button>;
}