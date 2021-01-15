import { useQuery, queryCache } from "react-query";
import { client } from "./api-client";

const loadingMember = {
  email: "Loading ...",
  name: "Loading ...",
  phoneNumber: "Loading ...",
  role: "Loading ...",
};

const loadingMembers = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-member-${index}`,
  ...loadingMember,
}));

const getMemberSearchConfig = (query, user) => ({
  queryKey: ["memberSearch", { query }],
  queryFn: () => {
    return client(`members?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then((data) => data.members);
  },

  config: {
    onSuccess(members) {
      for (const member of members) {
        setQueryDataForMember(member);
      }
    },
  },
});

async function refetchMemberSearchQuery(user) {
  queryCache.removeQueries("bookSearch");
  await queryCache.prefetchQuery(getMemberSearchConfig("", user));
}

function setQueryDataForMember(member) {
  queryCache.setQueryData(["member", { memberId: member.id }, member]);
}

function useMembersSearch(query, user) {
  const result = useQuery(getMemberSearchConfig(query, user));

  return { ...result, members: result.data ?? loadingMember };
}

export { useMembersSearch, refetchMemberSearchQuery };
