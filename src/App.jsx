import { WagmiConfig, createConfig, mainnet } from 'wagmi';
import { createPublicClient, http } from 'viem';
import Home from './components/Home';

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

function App() {
  return (
    <WagmiConfig config={config}>
      <Home />
    </WagmiConfig>
  );
}

export default App;
