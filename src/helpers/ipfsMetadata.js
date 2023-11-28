import env from '../utils/environment';

export const ipfsGetImage = (ipfsHash) => {
  if (!ipfsHash) {
    return '';
  }
  const URL = env.cloudflareUrl;
  const hash = ipfsHash.replace(/^ipfs?:\/\//, '');
  const imageUrl = URL + hash;

  return imageUrl;
};

export const addIPFSProxy = (ipfsHash) => {
  if (!ipfsHash) {
    return '';
  }
  const URL = env.ipfsUrl;
  const hash = ipfsHash.replace(/^ipfs?:\/\//, '');
  const ipfsURL = URL + hash;

  return ipfsURL;
};

export const replaceIdInIpfsUrl = (ipfsUrl, id) => {
  if (ipfsUrl.includes('{id}')) {
    return ipfsUrl.replace('{id}', id);
  } else {
    console.warn('"{id}" not found in the IPFS URL');
    return ipfsUrl;
  }
};

export const fetchMetadata = async (uri) => {
  const request = new Request(uri);
  try {
    const response = await fetch(request, { timeout: 30000 });
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata. Status: ${response.status}`);
    }

    const metadata = await response.json();
    return metadata;
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }
};
