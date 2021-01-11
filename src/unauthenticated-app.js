import { UnauthenticatedLayout } from "./unauthenticated-layout";
import { useAsync } from "./utils/hooks";

function LoginForm({ onSubmit }) {
  const { run } = useAsync();

  function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;

    console.log("email", email.value);
    console.log("password", password.value);

    onSubmit({ email: email.value, password: password.value });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="email"
            type="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="password"
            type="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm leading-5">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Sign in
          </button>
        </span>
      </div>
    </form>
  );
}

function Unauthenticatedapp({ login }) {
  return (
    <UnauthenticatedLayout>
      <div className="mt-6">
        <LoginForm onSubmit={login} />
      </div>
    </UnauthenticatedLayout>
  );
}

export { Unauthenticatedapp };
