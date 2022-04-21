import React from 'react';

type PropTypes = {
  src: string;
  alt?: string;
  className?: string;
};

const Image: React.FC<PropTypes> = ({ src, alt, className }) => {
  return (
    <img
      src={process.env.PUBLIC_URL + `/images/${src}`}
      className={className && className}
      alt={alt && alt}
    />
  );
};

export default Image;
