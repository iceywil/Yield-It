"use client";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { DataResponse } from "@/lib/gql";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";

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

export default function Component() {
  const campaigns = [
    {
      name: "Save the Forests",
      contractAddress: "0x1234567890123456789012345678901234567890",
      deploymentTime: "2023-06-15T10:30:00Z",
      tags: ["Environment", "Conservation", "Climate"],
    },
    {
      name: "Education for All",
      contractAddress: "0x0987654321098765432109876543210987654321",
      deploymentTime: "2023-06-14T14:45:00Z",
      tags: ["Education", "Equality", "Children"],
    },
    {
      name: "Clean Water Initiative",
      contractAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      deploymentTime: "2023-06-13T09:15:00Z",
      tags: ["Water", "Health", "Community"],
    },
  ];

  const { data } = useQuery<DataResponse>({
    queryKey: ["data"],
    async queryFn() {
      return await request<DataResponse>(
        "https://api.studio.thegraph.com/query/89493/handsup/version/latest",
        query
      );
    },
  });

  return (
    <div className="min-h-screen bg-[#FCF7E9] flex flex-col relative">
      <div className="w-full border-b-[2px] border-[#D42A20]">
        <Navbar />
      </div>

      <div className="absolute top-[25vh] left-1/4 transform -translate-x-1/2 -translate-y-1/2 ">
        <span className="text-5xl font-serif text-[#D42A20]">secure</span>
      </div>

      <div className="absolute top-[25vh] left-3/4 transform -translate-x-1/2 -translate-y-1/2 ">
        <span className="text-5xl font-serif text-[#D42A20]">low-fees</span>
      </div>

      <div className="absolute top-[55vh] left-3/4 transform -translate-x-1/2 -translate-y-1/2 ">
        <span className="text-5xl font-serif text-[#D42A20]">censorless</span>
      </div>

      <div className="absolute top-[45vh] left-1/4 transform -translate-x-1/2 -translate-y-1/2 ">
        <span className="text-5xl font-serif text-[#D42A20]">free</span>
      </div>

      <main className="flex-grow mt-64 flex flex-col items-center justify-center px-4 mt-[50px]">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-4">
            Help, without any
            <br />
            limits
            <Image
              src="/doodle1.png"
              alt="Decorative line"
              width={192}
              height={8}
              className="mx-auto mt-2"
            />
          </h1>
          <p className="text-2xl md:text-3xl mb-6 text-gray-900">
            The Donation, rethought.
            <br />
            Where everybody wins.
          </p>
        </div>
        <Link href="/campaign">
          <Button className="bg-[#F7D1D1] text-black font-bold hover:bg-[#F5B8B8] text-lg px-8 py-2 rounded-full">
            Start a pot
          </Button>
        </Link>

        <div className="pt-20 w-full max-w-4xl">
          <h2 className="text-3xl font-serif text-gray-900 mb-8 text-center">
            Active Campaigns
          </h2>
          {data?.campaignDeployeds.map((campaign, index) => (
            <Link href={`/campaign/${campaign.campaignAddress}`} key={index}>
              <Card key={index} className="mb-6">
                <CardHeader>
                  <CardTitle className="text-black">{campaign.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    Contract Address: {campaign.campaignAddress}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Deployed: {}
                    {new Date(campaign.blockTimestamp * 1000).toLocaleString()}
                  </p>
                  {campaign.tags && campaign.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {campaign.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : undefined}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
