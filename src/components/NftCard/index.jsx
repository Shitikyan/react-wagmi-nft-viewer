import React from 'react';
import { ipfsGetImage } from '../../helpers/ipfsMetadata';

const NFTCard = ({ nftData }) => {
  const image = ipfsGetImage(nftData?.image);
  return (
    <div className="card mb-4">
      <img
        className="card-img-top"
        src={image}
        alt={nftData?.name}
        style={{ borderRadius: '8px 8px 0 0' }}
      />
      <div className="card-body">
        <h5 className="card-title">{nftData?.name}</h5>
        <p className="card-text">{nftData?.description}</p>
        <a
          href={nftData?.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default NFTCard;
