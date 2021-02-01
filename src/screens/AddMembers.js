import React from "react";
import { Spinner } from "../components/lib";
import { useAsync } from "../utils/hooks";
import { client } from "../utils/api-client";
import { useNavigate } from "react-router-dom";

function MembershipForm({ user }) {
  const { run, isLoading, isError, error } = useAsync();
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const {
      name,
      email,
      role,
      phoneNumber,
      password,
      confirm_password,
    } = event.target.elements;

    run(
      client("register", "POST", {
        data: {
          name: name.value,
          email: email.value,
          role: role.value,
          phoneNumber: phoneNumber.value,
          password: password.value,
          confirm_password: confirm_password.value,
        },
        token: user.token,
      })
    );

    navigate("/members");
  }

  return (
    <div>
      {isError ? (
        <div role="alert" className="text-red-500">
          <span>There was an error: </span>
          <pre>{error.message}</pre>
        </div>
      ) : null}
      <form onSubmit={handleSubmit} className="w-3/4 m-4">
        <div className="w-2/5">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Name
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="name"
              type="text"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
        </div>
        <div className="w-2/5">
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

        <div className="w-3/5">
          <label
            htmlFor="role"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Role
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <select
              id="role"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            >
              <option value="" selected>
                select one
              </option>
              <option value="hub-manager">hub-manager</option>
              <option value="loader">loader/driver</option>
              <option value="supplier">supplier</option>
            </select>
          </div>
        </div>

        <div className="mt-6 w-3/5">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Phone Number
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="phoneNumber"
              type="text"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
        </div>

        <div className="mt-6 w-4/5">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            New Password
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="password"
              type="password"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
        </div>

        <div className="mt-6 w-4/5">
          <label
            htmlFor="confirm_password"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Confirm Password
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="confirm_password"
              type="password"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
        </div>

        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              className="flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"
            >
              Add a Member
              {isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null}
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}

function AddMembersScreen({ user }) {
  return (
    <div>
      <div className="w-11/12 mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Members</h1>
      </div>

      <div className="w-11/12 mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="border-4 border-dashed bg-white border-gray-200 rounded-lg ">
            <MembershipForm user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export { AddMembersScreen };
