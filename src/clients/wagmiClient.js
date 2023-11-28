import { polygon } from 'viem/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';

export const injectedConnector = new InjectedConnector({
  chains: [polygon],
  options: { name: 'Injected', shimDisconnect: true },
});
