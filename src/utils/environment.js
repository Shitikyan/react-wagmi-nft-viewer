const env = {
  cloudflareUrl:
    process.env.REACT_APP_CLOUDFLARE_URL ?? 'https://cloudflare-ipfs.com/ipfs/',
  ipfsUrl: process.env.REACT_APP_IPFS_URL ?? 'https://ipfs.io/ipfs/',
};

export default env;
