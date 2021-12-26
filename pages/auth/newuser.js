import react from "react";
import NewUserForm from "../../components/login/NewUserForm";

export default function NewUser() {
  const postNewUser = (event) => {};
  return (
    <main>
      <div className="flex justify-center mt-10">
        <NewUserForm passFormInfo={postNewUser}></NewUserForm>
      </div>
    </main>
  );
}
