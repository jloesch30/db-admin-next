export default function VerifyForm({ passFormInfo }) {
  return (
    <div className="m-auto">
      <form
        onSubmit={passFormInfo}
        className="bg-white shadow-md rounded mx-10 md:px-8 px-16 pt-6 pb-8 md:mb-4"
      >
        <div className="mb-1">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Verification Code
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="code"
            type="text"
            placeholder="Code"
          ></input>
        </div>
        <div className="mb-2">
          <p className="text-sm">
            Please enter the verification code sent to your mobile device
          </p>
        </div>
        <div className="flex items-center flex-col">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 mt-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit Code
          </button>
        </div>
      </form>
    </div>
  );
}
