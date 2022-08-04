import React from "react";

type CarouselItemImageType = {
  value: string;
  alt?: string;
};

export const CarouselItemImage = ({ value, alt }: CarouselItemImageType) => {
  return (
    <div className='carousel-item-image'>
      <img src={value} alt={alt} />
    </div>
  );
};
