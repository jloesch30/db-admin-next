import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Secret() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/secret");
      const json = await res.json();

      if (json.content) {
        setContent(json.content);
      }

      fetchData();
    };
  }, [session]);

  if (typeof window !== "undefined" && status === "loading") {
    return null;
  }

  if (!session) {
    return <div>You are not logged in!</div>;
  }
  return (
    <>
      <div>You can now access all pages</div>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  );
}
