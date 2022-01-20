import react from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import IndexCheckAuth from "../components/login/IndexCheckAuth";

function Home() {
  const router = useRouter();

  // check user authentication

  return (
    <main>
      {true && (
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
      {true && (
        <IndexCheckAuth>
          <div></div>
        </IndexCheckAuth>
      )}
    </main>
  );
}

export default Home;

// export async function getStaticProps(context) {
//   console.log(context.req);
//   return {
//     props: {
//       req: context.req,
//     },
//   };
// }
