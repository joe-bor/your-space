'use client'

import { useSession } from "next-auth/react"

type Props = {
    children: React.ReactNode
}


/*
useSession() gives us access to current session

status = authenticated | loading | unauthenticated
*/
export default function AuthCheck({ children }: Props ) {
    const {data: session, status } = useSession()

    console.log(session, status)

    if (status === 'authenticated'){
        return <>{children}</>
    } else {
        return <></>
    }
}