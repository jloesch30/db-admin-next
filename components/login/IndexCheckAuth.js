import react, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useCheckRefresh from "../../hooks/use-checkRefresh";

function isEmpty(object) {
  try {
    return Object.keys(object).length === 0;
  } catch (err) {
    console.log(object);
    return true;
  }
}

export default function IndexCheckAuth(props) {
  const router = useRouter();
  const cookiesEmpty = isEmpty(Cookies.get());
  const { refreshError, refreshLoading, checkRefresh } = useCheckRefresh();

  useEffect(() => {
    const refreshRes = checkRefresh("test");
    console.log(refreshRes);
  }, []);

  if (cookiesEmpty || refreshTokenInvalid) {
    setTimeout(() => {
      router.push("/auth/login");
    }, 2000);
  }

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
