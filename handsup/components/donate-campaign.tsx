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

interface DonateCampaignProps {
  contractAddress: string;
  amount: bigint;
  classicDonation: bigint;
}

export function DonateCampaign({
  contractAddress,
  classicDonation,
  amount,
}: DonateCampaignProps) {
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
      address: contractAddress as `0x${string}`,
      abi: parseAbi(["function contribute(uint256 amount, bool donation)"]),
      functionName: "contribute",
      args: [
        classicDonation > 0 ? classicDonation : amount,
        classicDonation > 0,
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
            className="w-full bg-[#F7D1D1] text-black font-bold hover:bg-[#F5B8B8] text-lg px-8 py-2 rounded-full"
          >
            {isPending ? "Confirming..." : "Confirm your contribution"}
          </Button>
        </form>
      </div>
    </div>
  );
}
