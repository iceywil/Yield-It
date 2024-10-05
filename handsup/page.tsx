import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { DataResponse } from "@/lib/gql";
import Landing from "./landing";
const query = gql`
  {
    campaignDeployeds {
      id
      creator
      campaignAddress
      name
      description
      imageURL
      tags
      raisingFor
      need
      beneficiary
      goal
      duration
      yieldStrategy
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

const url =
  "https://api.studio.thegraph.com/query/89493/handsup/version/latest";
export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<DataResponse>({
    queryKey: ["data"],
    async queryFn() {
      return await request<DataResponse>(url, query);
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Landing />
    </HydrationBoundary>
  );
}
