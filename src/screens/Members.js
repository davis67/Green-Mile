import React from "react";
import { Spinner } from "../components/lib";
import { useAsync } from "../utils/hooks";
import { client } from "../utils/api-client";
import { refetchMemberSearchQuery, useMembersSearch } from "../utils/members";
import { Link } from "react-router-dom";

function MembersScreen({ user }) {
  const [query, setQuery] = React.useState("");
  const [queried, setQueried] = React.useState(false);

  const { members, error, isLoading, isSuccess } = useMembersSearch(
    query,
    user
  );

  React.useEffect(() => {
    return () => refetchMemberSearchQuery(user);
  }, [user]);
  return (
    <div>
      <div className="w-11/12 mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold flex justify-between text-gray-900">
          <span className="flex justify-between ml-2 self-center">
            Members {isLoading ? <Spinner /> : null}
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
                      <div
                        className="bg-white m-4 h-16 flex items-center pl-6"
                        key={member.id}
                        aria-label={member.title}
                      >
                        <span className="text-xl">
                          <Link to="/members/add">{member.name}</Link>
                        </span>
                      </div>
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
