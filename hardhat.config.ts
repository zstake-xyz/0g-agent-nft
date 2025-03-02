import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
dotenv.config();

const ZG_TESTNET_PRIVATE_KEY = process.env.ZG_TESTNET_PRIVATE_KEY;
const ZG_AGENT_NFT_CREATOR_PRIVATE_KEY = process.env.ZG_AGENT_NFT_CREATOR_PRIVATE_KEY;
const ZG_AGENT_NFT_ALICE_PRIVATE_KEY = process.env.ZG_AGENT_NFT_ALICE_PRIVATE_KEY;
const ZG_AGENT_NFT_BOB_PRIVATE_KEY = process.env.ZG_AGENT_NFT_BOB_PRIVATE_KEY;

const config: HardhatUserConfig = {
  paths: {
    artifacts: "build/artifacts",
    cache: "build/cache",
    sources: "contracts",
    deploy: "scripts/deploy",
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      allowBlocksWithSameTimestamp: true,
      blockGasLimit: 100000000,
      gas: 100000000,
      accounts: [
        {
          privateKey: ZG_AGENT_NFT_CREATOR_PRIVATE_KEY || "",
          balance: "1000000000000000000000",
        },
        {
          privateKey: ZG_AGENT_NFT_ALICE_PRIVATE_KEY || "",
          balance: "1000000000000000000000",
        },
        {
          privateKey: ZG_AGENT_NFT_BOB_PRIVATE_KEY || "",
          balance: "1000000000000000000000",
        }
      ],
      live: false,
      saveDeployments: true,
      tags: ["test", "local"]
    },
    zgTestnet: {
      url: "https://evmrpc-testnet.0g.ai",
      accounts: [ZG_TESTNET_PRIVATE_KEY || ""],
      chainId: 16600,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gas: 10000000, 
      gasPrice: 20000000000
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      hardhat: 0,
      zgTestnet: 0,
    },
    creator: {
      default: 0,
      hardhat: 0,
      zgTestnet: 0,
    },
    alice: {
      default: 1,
      hardhat: 1,
    },
    bob: {
      default: 2,
      hardhat: 2,
    },
  },
  external: {
    contracts: [
      {
        artifacts: "build/artifacts",
      },
    ],
    deployments: {
      hardhat: ["deployments/hardhat"],
      zgTestnet: ["deployments/zgTestnet"],
    },
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  }
};

export default config;
