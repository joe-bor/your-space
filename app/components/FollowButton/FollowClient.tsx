'use client'

import { useTransition, useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
    targetUserId: string,
    isFollowing: boolean
}

function FollowClient({ targetUserId, isFollowing}: Props) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [isFetching, setIsFetching] = useState(false)
    const isMutating = isPending || isFetching
    
    
    const unfollow = async () => {
        setIsFetching(true)

        const res = await fetch(`/api/follow?targetUserId=${targetUserId}}`, {
            method: 'DELETE'
        })

        setIsFetching(false)
        startTransition(() => router.refresh())


    }

    const follow = async () => {
        setIsFetching(true)

        // make current user follow target user
        const res = await fetch('/api/follow', {
            method:  'POST',
            body: JSON.stringify({ targetUserId }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setIsFetching(false)
        console.log(res)
        
        startTransition(() => {
            /*
            https://nextjs.org/docs/app/api-reference/functions/use-router#userouter
                 Refresh the current route. Making a new request to the server, 
                 re-fetching data requests, and re-rendering Server Components. 
                 The client will merge the updated React Server Component payload 
                 without losing unaffected client-side React
            */
           router.refresh()
        })
    }

   if (isFollowing){
    return (
        <button onClick={unfollow}>
            {!isMutating ? 'Unfollow' : '...' }
        </button>
    )

   } else {
    return(
        <button onClick={follow}>
            {!isMutating ? 'Follow' : '...'}
        </button>
    )
   }


}
export default FollowClient