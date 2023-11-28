import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import NFTCard from '../NftCard';
import {
  addIPFSProxy,
  fetchMetadata,
  replaceIdInIpfsUrl,
} from '../../helpers/ipfsMetadata';
import erc721Methods from '../../helpers/erc721Methods';
import erc1155Methods from '../../helpers/erc1155Methods';
import { injectedConnector } from '../../clients/wagmiClient';
import { fetchStatuses } from '../../utils/constants';
import { wait } from '../../helpers/wait';

export default function Home() {
  const { isConnected } = useAccount();
  const [contractAddress, setContractAddress] = useState('');
  const [status, setStatus] = useState('');
  const [nfts, setNfts] = useState([]);

  const { connect, data } = useConnect({
    connectors: [injectedConnector],
    onError(error, variables, context) {
      console.error('error', { error, variables, context });
      if (variables.connector.id === 'metaMask') {
        setErrorMsg('An unexpected error occurred.');
      }
    },
  });

  const { disconnect } = useDisconnect();

  const handleConnect = async () => {
    try {
      await connect({ connector: injectedConnector });
    } catch (error) {
      console.error('Error connecting:', error);
    }
  };

  const nftsFetch = async () => {
    try {
      setStatus(fetchStatuses.LOADING);
      const isERC721 = await erc721Methods.supportsInterface(
        contractAddress,
        '0x80ac58cd'
      );
      if (!isERC721) {
        const totalSupply = await erc1155Methods.getTotalSupply(
          contractAddress
        );
        const tokenIds = [];
        let nfts = [];

        for (let i = 1; i < totalSupply; i++) {
          const owner = await erc1155Methods.getOwner(contractAddress, i);
          // Need to hardcode data?.account to see the NFTs
          // Contract Address: 0x76a2aD6A0A54BCB1D869D0f676d15148bfbB7097
          // Wallet Address: 0x71076B669b29f2FC3884A13bad658a1bAa95f435
          if (owner === data?.account) {
            tokenIds.push(i);
            const uri = await erc1155Methods.getUri(contractAddress, i);
            const formattedUri = replaceIdInIpfsUrl(uri, i);
            const metadata = await fetchMetadata(addIPFSProxy(formattedUri));
            if (metadata) {
              nfts.push(metadata);
            }
            await wait(100);
          }
        }

        if (nfts.length) {
          setNfts(nfts);
          setStatus(fetchStatuses.FETCHED);
        } else {
          setStatus(fetchStatuses.NO_DATA);
        }
        return;
      }

      const totalSupply = await erc721Methods.getTotalSupply(contractAddress);
      const tokenIds = [];

      for (let i = 1; i < totalSupply; i++) {
        const ownerOf = await erc721Methods.getOwnerOf(contractAddress, i);
        // Need to hardcode data?.account to see the NFTs
        // Contract Address: 0x0a67457f9FaA2492D5a4d1A502E0FE1382B1D232
        // Wallet Address: 0x7d5573072e3522bE11a2579A3f0594DAaC9dce7e
        if (ownerOf === data?.account) {
          tokenIds.push(i);
        }
        await wait(100);
      }

      let nfts = [];
      for (const tokenId of tokenIds) {
        const tokenURI = await erc721Methods.getTokenURI(
          contractAddress,
          tokenId
        );
        const uri = addIPFSProxy(tokenURI);
        const metadata = await fetchMetadata(uri);
        if (metadata) {
          nfts.push(metadata);
        }
      }
      if (nfts.length) {
        setNfts(nfts);
        setStatus(fetchStatuses.FETCHED);
      } else {
        setStatus(fetchStatuses.NO_DATA);
      }
    } catch (error) {
      console.error(error);
      setStatus(fetchStatuses.NO_DATA);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await nftsFetch();
  };

  return (
    <div className="row justify-content-center">
      {isConnected ? (
        <div className="col-md-6">
          <button className="btn btn-danger mt-3" onClick={disconnect}>
            Disconnect Wallet
          </button>
          <form onSubmit={onSubmit}>
            <div className="mb-3 mt-3">
              <label htmlFor="contractAddress" className="form-label">
                Contract Address
              </label>
              <input
                type="text"
                id="contractAddress"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="form-control"
                placeholder="Enter Contract Address"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="walletAddress" className="form-label">
                Wallet Address
              </label>
              <input
                type="text"
                id="walletAddress"
                value={data?.account ?? ''}
                className="form-control"
                placeholder="Enter Wallet Address"
                readOnly
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mb-3"
              disabled={status === fetchStatuses.LOADING}
            >
              Fetch NFTs
            </button>
          </form>

          {status === fetchStatuses.LOADING && (
            <div className="loader">Loading...</div>
          )}

          {status === fetchStatuses.FETCHED &&
            nfts?.map((nft, key) => <NFTCard nftData={nft} key={key} />)}

          {status === fetchStatuses.NO_DATA && <div>No Data</div>}
        </div>
      ) : (
        <button
          className="btn btn-primary mt-3 col-md-2"
          onClick={handleConnect}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
