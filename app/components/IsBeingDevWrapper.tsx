import { ReactNode } from "react";

export function IsBeingDevWrapper({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={`${className} border-4 border-rose-900 p-5 rounded-lg bg-rose-950 before:[content:'Work_in_progress'] before:mb-3 before:block`}>
      {children}
    </div>
  )
}
