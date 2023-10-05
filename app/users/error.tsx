'use client'

import { useEffect } from "react"

interface Props {
    error: Error;
    reset: () => void
}

export default function Error({ error, reset} : Props) {

    useEffect(() => {
      console.error(error)
    }, [error])
    
  return (
    <div>
        <h2>Something Went Wrong!</h2>
        <button onClick={() => reset()}>Try Again</button>
    </div>
  )
}