import { FormEvent, use, useEffect } from "react";
import {
  type BaseError,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { parseAbi } from "viem";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import Link from "next/link";

interface CreateCampaignProps {
  name: string;
  tags: string[];
  raisingFor: string;
  need: string;
  goal: bigint;
}

export function CreateCampaign({
  name,
  tags,
  raisingFor,
  need,
  goal,
}: CreateCampaignProps) {
  const { address, chainId } = useAccount();
  const { toast } = useToast();

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const explorer =
    chainId == 59141
      ? "https://sepolia.lineascan.build"
      : "https://evm-testnet.flowscan.io/";
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    writeContract({
      address:
        chainId == 59141
          ? "0x0707594e6123c32a24ad5C646B2ECB735322EC95"
          : "0xfB979D86e10Fd018803C8bd8D74C131d813893e1",
      abi: parseAbi([
        "function createHandOutCampaign(string memory _name,        string memory _description,        string memory _imageURL,        string[] memory _tags,        string memory _raisingFor,        string memory _need,        address _beneficiary,        uint256 _goal,        uint256 _duration,        address _yieldStrategy)",
      ]),
      functionName: "createHandOutCampaign",
      args: [
        name,
        `A campaign to raise funds for ${raisingFor} to address ${need}`,
        "https://source.unsplash.com/random",
        tags,
        raisingFor,
        "Urgent",
        address as `0x${string}`,
        goal * BigInt(10) ** BigInt(18),
        BigInt(60 * 60 * 24 * 30),
        chainId == 59141
          ? "0x6EB69807304823665642D285BA92a04e9c1194B8"
          : "0x6EB69807304823665642D285BA92a04e9c1194B8",
      ],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    {
      isConfirming &&
        toast({
          title: "Waiting for confirmation...",
          action: (
            <ToastAction altText="Explorer" asChild>
              <Link target="_blank" href={`${explorer}/tx/${hash}`}>
                Explorer
              </Link>
            </ToastAction>
          ),
          className: "text-black",
        });
    }
    {
      isConfirmed &&
        toast({
          title: "Transaction confirmed.",
          action: (
            <ToastAction altText="Explorer" asChild>
              <Link target="_blank" href={`${explorer}/tx/${hash}`}>
                Explorer
              </Link>
            </ToastAction>
          ),
          className: "text-black",
        });
    }
    {
      error &&
        toast({
          title: "Error",
          description: (error as BaseError).shortMessage || error.message,
          variant: "destructive",
          className: "text-black",
        });
    }
  }, [isConfirming, isConfirmed, error]);

  return (
    <div className="container">
      <div className="stack">
        <form className="set" onSubmit={submit}>
          <Button
            disabled={isPending}
            type="submit"
            className="bg-[#F7D1D1] text-black font-bold hover:bg-[#F5B8B8] text-lg px-8 py-2 rounded-full"
          >
            {isPending ? "Confirming..." : "Start your campaign"}
          </Button>
        </form>
      </div>
    </div>
  );
}
