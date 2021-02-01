import React from "react";

import { useParams } from "react-router-dom";

import { useMember } from "../utils/members";

import { useAsync } from "../utils/hooks";

import { client } from "../utils/api-client";

import { Link, useNavigate } from "react-router-dom";

import { Spinner } from "../components/lib";

function MemberScreen({ user }) {
  const { memberId } = useParams();

  const { isLoading, isError, isSuccess, member } = useMember(memberId, user);

  let navigate = useNavigate();

  async function deleteMember() {
    client(`auth/members/${member.id}`, "DELETE");

    navigate("/members");
  }

  return (
    <div>
      <div className="w-11/12 mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold flex justify-between text-gray-900">
          <span className="flex justify-between ml-2 self-center">
            <Link to="/members">Members</Link>
            {isLoading ? <Spinner /> : null}
          </span>
        </h1>
      </div>

      <div className="w-11/12 mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className=" rounded-lg ">
            <div
              css={{
                marginTop: 20,
                fontSize: "1.2em",
                textAlign: "center",
              }}
            >
              {isLoading ? (
                <div css={{ width: "100%", margin: "auto" }}>
                  <Spinner />
                </div>
              ) : null}
            </div>

            <div>
              {isSuccess ? (
                <div css={{ marginTop: 20 }}>
                  <div
                    className="bg-white my-4 py-4 h-96 py-6 flex justify-between items-center hover:shadow-sm leading-8 pl-6"
                    key={member.id}
                    aria-label={member.title}
                  >
                    <div className="space-y-10">
                      <div className="text-xl space-x-3">
                        <span>Name:</span>
                        <span> {member.name}</span>
                      </div>
                      <div className="text-xl space-x-3">
                        <span>Email-Address:</span>
                        <span>{member.email}</span>
                      </div>

                      <div className="text-xl space-x-3">
                        <span>UserName:</span>
                        <span>{member.username}</span>
                      </div>

                      <div className="text-xl space-x-3">
                        <span className="font-medium leading-7">
                          SuperUser:
                        </span>
                        <span className="bg-gray-700 leading-7 py-2 px-2 text-sm text-white ">
                          {member.is_superuser ? "Admin" : "Normal User"}
                        </span>
                      </div>
                      <div className="text-xl space-x-3">
                        <span className="font-medium leading-7">Staff:</span>
                        <span className="bg-gray-700 leading-7 py-2 px-2 text-sm text-white ">
                          {member.is_staff ? "StaffMember" : "Not Staff Member"}
                        </span>
                      </div>
                      <div className="text-xl space-x-3">
                        <span className="bg-gray-600 leading-7 py-2 px-2 text-sm text-white ">
                          <Link to={`/members/${member.id}/edit`}>
                            {`Edit ${member.name}'s profile info`}
                          </Link>
                        </span>
                        <button
                          className="bg-red-700 leading-7 px-2 text-sm text-white"
                          onClick={deleteMember}
                        >
                          Delete {member.name}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MemberScreen };
