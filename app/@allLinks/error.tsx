'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from '../components/Button'
 
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
    <div className='rounded-lg bg-zinc-900 border border-gray-500 text-sm p-2 my-2'>
      <h2 className='text-lg text-center mb-4'>Something went wrong!</h2>
      <Button
      className=" w-full"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}