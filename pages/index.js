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
          <div>
            <p className="text-3xl">Protected Page</p>
          </div>
          <br />
          <div className="flex justify-center align-middle">
            <div className="shadow-lg rounded-md bg-slate-200">
              <p className="py-3 px-10">
                It looks like you are not logged in....
                <br />
                <span className="font-thin italic">
                  One moment as we take you to the login page
                </span>
              </p>
            </div>
          </div>
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
