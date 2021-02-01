import React from "react";
import { Spinner } from "../components/lib";
import { useAsync } from "../utils/hooks";
import { client } from "../utils/api-client";
import { refetchMemberSearchQuery, useMembersSearch } from "../utils/members";
import { Link } from "react-router-dom";

function MembersScreen({ user, token }) {
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState(false);

  const { members, error, isLoading, isSuccess } = useMembersSearch(
    query,
    user,
    token
  );

  React.useEffect(() => {
    return () => refetchMemberSearchQuery(user, token);
  }, [user, token]);
  return (
    <div>
      <div className="w-11/12 mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold flex justify-between text-gray-900">
          <span className="flex justify-between ml-2 self-center">
            <Link to="/members/add">Members</Link>
            {isLoading ? <Spinner /> : null}
          </span>
        </h1>
      </div>

      <div className="w-11/12 mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className=" rounded-lg ">
            {queried ? null : (
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
            )}
            <div>
              {isSuccess ? (
                members.length ? (
                  <div css={{ marginTop: 20 }}>
                    {members.map((member) => (
                      <Link to={`/members/${member.id}`} key={member.id}>
                        <div
                          className="bg-white my-4 py-4 h-24 py-6 flex justify-between hover:shadow-sm leading-8 pl-6"
                          aria-label={member.title}
                        >
                          <div>
                            <div className="text-xl">{member.name}</div>
                            <div className="text-md">{member.email}</div>
                          </div>
                          <div className="mr-6">
                            <span className="bg-gray-700 leading-7 py-2 px-2 text-xs text-white ">
                              {member.role}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p>No members found. Try another search.</p>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MembersScreen };
