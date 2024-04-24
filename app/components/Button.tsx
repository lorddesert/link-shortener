import { ReactNode } from "react";

export function Button({
  children,
  type,
  className: cn = "",
  variant = "default",
  disabled = false,
  ...restOfProps
}: {
  children: ReactNode,
  className?: string,
  type?: "submit" | "reset" | "button" | undefined,
  variant?: "ghost" | "default",
  disabled?: boolean,
  onClick?: () => void
}) {
  return <button disabled={disabled} type={type || "button"} {...restOfProps} className={` 
  ${variant === 'default' && `p-2 border-gray-500 border bg-zinc-900 rounded-lg h-full outline-none focus:border-gray-200`} 
  ${variant === 'ghost' && `p-2 border-gray-500 border bg-zinc-900 rounded-lg outline-none border-1 border-transparent transition-colors hover:bg-zinc-700 focus:border-zinc-600 h-auto bg-opacity-0 active:bg-zinc-600`} 
  ${cn}
  `}>
    {children}
  </button>;
}