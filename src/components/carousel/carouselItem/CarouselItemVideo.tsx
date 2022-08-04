import React from "react";

type CarouselItemVideoType = {
  value: string;
};

export const CarouselItemVideo = ({ value }: CarouselItemVideoType) => {
  return <div className='carousel-item-video'>{value}</div>;
};
