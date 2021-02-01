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
    return client(
      `auth/members?query=${encodeURIComponent(query)}`,
      "GET"
    ).then((data) => data.data);
  },

  config: {
    onSuccess(data) {
      for (const member of data) {
        setQueryDataForMember(member);
      }
    },
  },
});

async function refetchMemberSearchQuery(user) {
  queryCache.removeQueries("memberSearch");
  await queryCache.prefetchQuery(getMemberSearchConfig("", user));
}

function setQueryDataForMember(member) {
  queryCache.setQueryData(["member", { memberId: member.id }, member]);
}

function useMembersSearch(query, user) {
  const result = useQuery(getMemberSearchConfig(query, user));

  return { ...result, members: result.data ?? loadingMember };
}

function useMember(memberId, user) {
  const data = useQuery({
    queryKey: ["member", { memberId }],
    queryFn: () =>
      client(`auth/members/${memberId}`, "GET").then((data) => data.data),
  });

  return {
    isLoading: data.isLoading,
    isError: data.isError,
    isSuccess: data.isSuccess,
    member: data.data ?? loadingMember,
  };
}

export { useMembersSearch, useMember, refetchMemberSearchQuery };
