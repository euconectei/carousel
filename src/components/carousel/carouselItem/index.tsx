import React from "react";
import { CarouselItemImage } from "./CarouselItemImage";
import { CarouselItemVideo } from "./CarouselItemVideo";

import "./carousel-item.css";

export type CarouselItemType = {
  value: string;
  type?: string;
  alt?: string;
  width?: string;
};

export const CarouselItem = ({
  value,
  type = "text",
  width = "100%",
}: CarouselItemType) => {
  if (type === "image") {
    return (
      <div className='carousel-item' style={{ minWidth: width }}>
        <CarouselItemImage value={value} />
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className='carousel-item' style={{ minWidth: width }}>
        <CarouselItemVideo value={value} />
      </div>
    );
  }

  return (
    <div className='carousel-item' style={{ minWidth: width }}>
      {value}
    </div>
  );
};
