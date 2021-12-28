import react from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import IndexCheckAuth from "../components/login/IndexCheckAuth";

function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  // check user authentication
  useEffect(() => {
    if (!session) {
      setTimeout(() => {
        // router.push("auth/signin"); //TODO: uncomment this
      }, 2000);
    }
  }, []);

  return (
    <main>
      {!session && (
        // if the user does not have a session, redirect to login
        <IndexCheckAuth>
          <p>
            It looks like you are not logged in....
            <br />
            Redirecting you to the login page
          </p>
        </IndexCheckAuth>
      )}
      {session && (
        <IndexCheckAuth>
          <div></div>
        </IndexCheckAuth>
      )}
    </main>
  );
}

export default Home;
