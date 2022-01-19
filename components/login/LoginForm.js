import useInput from "../../hooks/use-input";

export default function LoginForm({ passFormInfo, loginError, loginLoading }) {
  const {
    value: enteredUsername,
    isValid: enteredUserNameValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (enteredUserNameValid && enteredPasswordValid) {
    formIsValid = true;
  }

  return (
    <div className="m-auto">
      <form
        onSubmit={(e) =>
          passFormInfo(e, resetPasswordInput, resetUsernameInput)
        }
        className="bg-white shadow-md rounded md:px-8 px-16 pt-6 pb-8 md:mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={`shadow appearance-none border ${
              usernameHasError ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="username"
            type="text"
            placeholder="Username"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
          ></input>
          {usernameHasError && (
            <p className="text-red-500 text-xs italic">
              Please include a username.
            </p>
          )}
        </div>
        <div className="mb-0 md:mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border ${
              passwordHasError ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="**************"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          ></input>
          {passwordHasError && (
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          )}
        </div>
        <div className="invisible md:visible flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={!formIsValid}
          >
            Sign In
          </button>
          <div>
            <a
              className="ml-2 inline-block align-baseline font-bold text-sm text-blue-300 hover:text-blue-500"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="visible md:invisible flex items-center flex-col">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={!formIsValid}
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-300 hover:text-blue-500"
            href="#"
          >
            Forgot Password?
          </a>
          {loginError && (
            <div className="text-center">
              <p className="text-red-400 font-semibold mt-2">
                This user does not exist
                <br />
                Please try again
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
