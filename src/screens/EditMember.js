import React from "react";
import { Spinner } from "../components/lib";
import { useAsync } from "../utils/hooks";
import { useParams, useNavigate } from "react-router-dom";
import { client } from "../utils/api-client";
import { useMember } from "../utils/members";

function MembershipForm({ user }) {
  const { memberId } = useParams();
  let navigate = useNavigate();
  const { member } = useMember(memberId, user);
  const [name, setName] = React.useState(member.name);
  const [username, setUsername] = React.useState(member.username);
  const [phone_number, setPhonenumber] = React.useState(member.phone_number);
  const [role, setRole] = React.useState(member.role);
  const [email, setEmail] = React.useState(member.email);
  const [is_superuser, setIssuperuser] = React.useState(member.is_superuser);
  const [is_staff, setIsstaff] = React.useState(member.is_staff);
  const { run, isLoading, isError, error } = useAsync();

  function handleSubmit(event) {
    event.preventDefault();

    const {
      name,
      email,
      username,
      phone_number,
      role,
      is_staff,
      is_superuser,
    } = event.target.elements;

    run(
      client(`auth/members/${member.id}`, "PUT", {
        data: {
          name: name.value,
          username: username.value,
          email: email.value,
          phone_number: phone_number.value,
          role: role.value,
          is_superuser: is_superuser.checked,
          is_staff: is_staff.checked,
        },
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
            htmlFor="username"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Username
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
        </div>
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
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              defaultValue={role}
              onChange={(event) => setRole(event.target.value)}
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
              id="phone_number"
              type="text"
              value={phone_number}
              onChange={(event) => setPhonenumber(event.target.value)}
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            />
          </div>
        </div>

        <div className="w-3/5">
          <label
            htmlFor="role"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Admin
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="is_superuser"
              type="checkbox"
              defaultChecked={is_superuser}
              onChange={(event) => setIssuperuser(event.target.checked)}
              className="mr-4"
            />{" "}
            Is Super Admin
          </div>
        </div>

        <div className="w-3/5">
          <label
            htmlFor="is_staff"
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Staff Member
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="is_staff"
              type="checkbox"
              defaultChecked={is_staff}
              onChange={(event) => {
                setIsstaff(event.target.checked);
              }}
              className="mr-4"
            />{" "}
            Is Staff Member
          </div>
        </div>

        <div className="mt-6">
          <span className="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              className="flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"
            >
              {`Update ${member.name}'s profile info`}
              {isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null}
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}

function EditMemberScreen({ user }) {
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

export { EditMemberScreen };
