import react from "react"
import Link from "next/link"
import { signIn, signOut, useSession } from 'next-auth/react'

function Home() {
  const { data: session } = useSession()
  return (
    <main>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <div>You can now see the pages!</div>
          <Link href="/secret">To the secret</Link> <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </main>
  )
}

export default Home
