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
  variant?: "ghost" | "default" | "danger",
  disabled?: boolean,
  onClick?: (e?: any) => void
}) {
  return <button disabled={disabled} type={type || "button"} {...restOfProps} className={`
  hover:border-gray-200
  ${variant === 'default' && `p-2 border-gray-500 border bg-zinc-900 rounded-lg h-full outline-none focus:border-gray-200`} 
  ${variant === 'ghost' && `p-2 border-gray-500 border bg-zinc-900 rounded-lg outline-none border-1 border-transparent transition-colors hover:bg-zinc-700 focus:border-zinc-600 h-auto bg-opacity-0 active:bg-zinc-600`}
  ${variant === 'danger' && `p-2 border-red-700 border bg-zinc-900 rounded-lg outline-none border-1 border-transparent transition-colors hover:bg-red-700 focus:border-red-600 h-auto bg-opacity-0 active:bg-red-600`}
  ${disabled && 'hover:cursor-not-allowed opacity-60'}
  ${cn}
  `}>
    {children}
  </button>;
}