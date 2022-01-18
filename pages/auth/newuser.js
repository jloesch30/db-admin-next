/* 
Everify? https://everify.dev/blog/two-factor-authentication-for-nextjs
2 auth
*/
import react from "react";
import NewUserForm from "../../components/login/NewUserForm";

export default function NewUser() {
  const postNewUser = (event) => {};
  return (
    <main>
      <div className="flex h-screen">
        <NewUserForm passFormInfo={postNewUser}></NewUserForm>
      </div>
    </main>
  );
}
