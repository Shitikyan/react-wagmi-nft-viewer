# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# React NFT Viewer

This React application allows users to connect their wallet, input an NFT contract address, and fetch NFTs owned by the connected wallet. It leverages the wagmi and viem libraries for interacting with the blockchain directly.

## Requirements

- Node.js and npm installed on your machine.
- A compatible Ethereum wallet (e.g., MetaMask) installed in your browser.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Shitikyan/react-wagmi-viem.git
   ```

## Navigate to the project directory:

```
cd react-wagmi-viem
```

## Install dependencies:

```
npm install
```

## Run the application:

```
npm start
```

The application should be accessible at http://localhost:5173 (Check on terminal).

# Usage

Connect your Ethereum wallet using the provided wallet connect button.

Input an NFT contract address in the designated input field. You can use the contract addresses mentioned in the comments by copying and pasting them.

```
// Lines 59-60
// Need to hardcode data?.account to see the NFTs
// Contract Address: 0x76a2aD6A0A54BCB1D869D0f676d15148bfbB7097
// Wallet Address: 0x71076B669b29f2FC3884A13bad658a1bAa95f435
```

```
// Lines 87-88
// Need to hardcode data?.account to see the NFTs
// Contract Address: 0x0a67457f9FaA2492D5a4d1A502E0FE1382B1D232
// Wallet Address: 0x7d5573072e3522bE11a2579A3f0594DAaC9dce7e
```
