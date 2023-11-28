import { publicClient } from '../clients/viemClient';

const getUri = async (contractAddress, tokenId) => {
  const uri = await publicClient.readContract({
    address: contractAddress,
    abi: [
      {
        inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        name: 'uri',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    args: [tokenId],
    functionName: 'uri',
  });

  return uri.valueOf();
};

const getTotalSupply = async (contractAddress) => {
  const totalSupply = await publicClient.readContract({
    address: contractAddress,
    abi: [
      {
        inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    args: [1],
    functionName: 'totalSupply',
  });

  return totalSupply.valueOf();
};

const getOwner = async (contractAddress) => {
  const owner = await publicClient.readContract({
    address: contractAddress,
    abi: [
      {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: 'result', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'owner',
  });

  return owner.valueOf();
};

export default { getUri, getTotalSupply, getOwner };
