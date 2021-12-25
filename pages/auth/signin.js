import LoginForm from "../../components/login/LoginForm";
import { getProviders, signIn } from "next-auth/react";

export default function SignIn({ providers }) {
  const submitFormInformation = (event) => {
    const userName = event.target[0].value;
    const pass = event.target[1].value;

    console.log(userName, pass);
    // sign the user in

    // TODO: delete this
    Object.values(providers).map((provider) => {
      console.log(provider.name);
    });

    event.preventDefault();
  };

  return (
    <main>
      <div className="flex justify-center mt-10">
        <LoginForm passFormInfo={submitFormInformation}></LoginForm>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
