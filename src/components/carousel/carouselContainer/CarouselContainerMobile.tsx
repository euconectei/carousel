import React from "react";

export type CarouselContainerMobileType = {
  ref: string;
  children: React.ReactNode;
};

const CarouselContainerMobile = ({
  ref,
  children,
}: CarouselContainerMobileType) => {
  return <div ref={ref}>{children}</div>;
};

export default CarouselContainerMobile;
