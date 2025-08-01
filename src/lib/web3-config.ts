'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    arbitrum,
    base,
    mainnet,
    optimism,
    polygon,
    sepolia,
    type Chain,
} from 'wagmi/chains';

const hyperliquidMainnet = {
    id: 999,
    name: 'HyperEVM',
    nativeCurrency: {
        name: 'HYPE',
        symbol: 'HYPE',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.hyperliquid.xyz/evm'],
        },
        public: {
            http: ['https://rpc.hyperliquid.xyz/evm'],
        },
    },
} as const satisfies Chain;
export const config = getDefaultConfig({
    appName: 'Hyperliquid Academy',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!, // Get from WalletConnect Cloud
    chains: [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        base,
        hyperliquidMainnet,
        ...(process.env.NODE_ENV === 'development' ? [sepolia] : []),
    ],
    ssr: true,
});