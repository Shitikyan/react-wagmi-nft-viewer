import { publicClient } from '../clients/viemClient';

const getTotalSupply = async (contractAddress) => {
  const totalSupply = await publicClient.readContract({
    address: contractAddress,
    abi: [
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'totalSupply',
  });

  return totalSupply.valueOf();
};

const getOwnerOf = async (contractAddress, tokenId) => {
  const ownerOf = await publicClient.readContract({
    address: contractAddress,
    abi: [
      {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'ownerOf',
    args: [tokenId],
  });

  return ownerOf.valueOf();
};

const getTokenURI = async (contractAddress, tokenId) => {
  const tokenURI = await publicClient.readContract({
    address: contractAddress,
    abi: [
      {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'tokenURI',
    args: [tokenId],
  });

  return tokenURI.valueOf();
};

const supportsInterface = async (contractAddress, interfaceId) => {
  try {
    const tokenURI = await publicClient.readContract({
      address: contractAddress,
      abi: [
        {
          inputs: [
            { internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' },
          ],
          name: 'supportsInterface',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      functionName: 'supportsInterface',
      args: [interfaceId],
    });

    return tokenURI.valueOf();
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default {
  getOwnerOf,
  getOwnerOf,
  getTokenURI,
  getTotalSupply,
  supportsInterface,
};
