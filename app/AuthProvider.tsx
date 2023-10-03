'use client'

import { SessionProvider } from "next-auth/react"

type Props =  {
    children: React.ReactNode
}

// SessionProvider uses some client side features, even though it doesnt specifiy it is a client component                                  
export default function AuthProvider( { children }: Props) {
    return <SessionProvider>{children}</SessionProvider>
}