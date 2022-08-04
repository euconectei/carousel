import React from "react";
import { CarouselItemType } from "../carouselItem";

export type CarouselIndicatorsType = {
  items: CarouselItemType[];
  currentIndicator: number;
  changeCallback: (indicator: number) => void;
};

const CarouselIndicators = ({
  items,
  currentIndicator,
  changeCallback,
}: CarouselIndicatorsType) => {
  const indicators = items.map((item, index) => (
    <li
      key={`indicator-${index}`}
      className={index == currentIndicator ? "active" : ""}>
      <button onClick={() => changeCallback(index)}>{index}</button>
    </li>
  ));

  return <ul className='carousel-indicators'>{indicators}</ul>;
};

export default CarouselIndicators;
