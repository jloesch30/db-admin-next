import react from "react";

export default function LoginForm({ passFormInfo }) {

  return (
    <div className="md:w-full md:max-w-sm">
      <form onSubmit={passFormInfo} className="bg-white shadow-md rounded md:px-8 px-16 pt-6 pb-8 md:mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          ></input>
        </div>
        <div className="mb-0 md:mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="**************"
          ></input>
          <p className="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div className="invisible md:visible flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="visible md:invisible flex items-center flex-col">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-300 hover:text-blue-500"
            href="#"
          >
            Forgot Password?
          </a>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-300 hover:text-blue-500"
            href="#"
          >
            Create an Account
          </a>
        </div>
      </form>
    </div>
  );
}
