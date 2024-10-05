"use client";

import { wagmiAdapter, projectId } from "@/lib/wagmiConfig";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { CaipNetwork, createAppKit } from "@reown/appkit/react";
import {
  mainnet,
  arbitrum,
  avalanche,
  base,
  optimism,
  polygon,
} from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { lineaSepolia } from "viem/chains";

const flow: CaipNetwork = {
  id: "eip155:545",
  chainId: 545,
  chainNamespace: "eip155",
  name: "Flow",
  rpcUrl: "https://testnet.evm.nodes.onflow.org",
  explorerUrl: "https://evm-testnet.flowscan.io",
  imageUrl: "https://developers.flow.com/img/flow-docs-logo-light.png",
  imageId: "flow",
  currency: "FLOW",
};

const linea: CaipNetwork = {
  id: `eip155:${lineaSepolia.id}`,
  chainId: lineaSepolia.id,
  chainNamespace: "eip155",
  name: lineaSepolia.name,
  rpcUrl: lineaSepolia.rpcUrls.default.http[0],
  explorerUrl: lineaSepolia.blockExplorers.default.url,
  imageUrl:
    "https://docs.lineascan.build/~gitbook/image?url=https%3A%2F%2F3545049868-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fcollections%252F2Jl594MjukDCeX0qYs61%252Ficon%252FjdClg9JGQKmrp03sAdRi%252Flinea.png%3Falt%3Dmedia%26token%3D9959f44b-0582-4935-9204-f5c286960428&width=32&dpr=2&quality=100&sign=636a1fd7&sv=1",
  imageId: "linea",
  currency: "ETH",
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 0,
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const queryClient = getQueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "appkit-example-scroll",
  description: "AppKit Example - Scroll",
  url: "https://scrollapp.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
const modal = createAppKit({
  allowUnsupportedChain: true,
  adapters: [wagmiAdapter],
  projectId,
  networks: [
    linea,
    flow,
    mainnet,
    arbitrum,
    avalanche,
    base,
    optimism,
    polygon,
  ],
  defaultNetwork: linea,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider
        config={wagmiAdapter.wagmiConfig as Config}
        initialState={initialState}
      >
        {" "}
        {children}
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default ContextProvider;
