,./p-]]
"use client";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
const query = gql`
  {
    campaignDeployeds(first: 5) {
      id
      creator
      campaignAddress
      blockNumber
    }
    ownershipTransferreds(first: 5) {
      id
      previousOwner
      newOwner
      blockNumber
    }
  }
`;
const url =
  "https://api.studio.thegraph.com/query/89493/handsup/version/latest";
export default function Data() {
  // the data is already pre-fetched on the server and immediately available here,
  // without an additional network call
  const { data } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query);
    },
  });
  return <div>{JSON.stringify(data ?? {})}</div>;
}
