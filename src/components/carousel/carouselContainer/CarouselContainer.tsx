export type CarouselContainerType = {
  ref: string;
  children: React.ReactNode;
};

const CarouselContainer = ({ ref, children }: CarouselContainerType) => {
  return <div ref={ref}>{children}</div>;
};

export default CarouselContainer;
