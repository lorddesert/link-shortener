'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from './components/Button'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="grid place-content-center gap-4">
      <h2 className="text-3xl">Something went wrong!</h2>
      <pre className='rounded-lg bg-zinc-800 text-white p-2 border border-zinc-700'>Error: {error.message}</pre>
      <Button onClick={reset}>
        Click to go home
      </Button>
    </div>
  )
}