import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import Data from "../components/Data";
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
export default async function HomePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query);
    },
  });
  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Data />
    </HydrationBoundary>
  );
}
