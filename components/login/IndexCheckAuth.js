import react, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useCheckRefresh from "../../hooks/use-checkRefresh";

function isEmpty(object) {
  try {
    return Object.keys(object).length === 0;
  } catch (err) {
    console.log("Logging object as:", object);
    return true;
  }
}

export default function IndexCheckAuth(props) {
  const router = useRouter();
  const { refreshError, refreshLoading, checkRefresh } = useCheckRefresh();
  const [cookiesEmpty, setCookiesEmpty] = useState(null);

  useEffect(() => {
    const token = Cookies.get("authorization");
    console.log("The token is:", token);
    const refreshRes = checkRefresh(token);

    if (refreshRes.accessToken) {
      console.log(refreshRes.accessToken);
      setCookiesEmpty(false);
    } else {
      setCookiesEmpty(true);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    }
  }, []);

  // if (cookiesEmpty || refreshTokenInvalid) {
  //   setTimeout(() => {
  //     router.push("/auth/login");
  //   }, 2000);
  // }

  return (
    <div>
      {cookiesEmpty && (
        <div className="container mx-auto">
          <div className="flex flex-col justify-center text-center my-20">
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
          </div>
        </div>
      )}
    </div>
  );
}
