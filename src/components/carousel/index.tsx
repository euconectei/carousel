import { CarouselItem, CarouselItemType } from "./carouselItem";

import "./carousel.css";
import React, { useEffect, useRef, useState } from "react";
import { useWindowSize } from "./hooks/useWindowResize";
import CarouselIndicators from "./carouselIndicators";

type CarouselType = {
  infinite?: boolean;
  items: CarouselItemType[];
  itemsToShow?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  mobile?: boolean;
};

export const Carousel = ({
  infinite = false,
  items,
  itemsToShow = 1,
  mobile = true,
  showControls = false,
  showIndicators = false,
}: CarouselType) => {
  let startTemp: number;
  let startX: number;
  let x: number;
  let endX: number;
  let pressed = false;
  let wCarouselItem: number = 0;
  const elemContainer = useRef<HTMLDivElement>(null);
  const elemInner = useRef<HTMLDivElement>(null);
  const nodeInner = elemInner.current;
  const nodeContainer = elemContainer.current;
  const [slides, setSlides] = useState<any>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const size = useWindowSize();

  const createSlides = (width: string) => {
    setSlides(
      items.map(({ value, type }, index) => {
        if (elemContainer.current) {
          return (
            <CarouselItem
              key={`carousel-item-${index}`}
              value={value}
              type={type}
              width={`${width}px`}
            />
          );
        }
      })
    );
  };

  const moveSlide = (option: any) => {
    if (nodeInner) {
      nodeInner.style.transition = "all ease 0.3s";
    }
    if (option === "prev") {
      if (currentIndex <= 0 && infinite) {
        return setCurrentIndex(items.length - 1);
      }
      return setCurrentIndex(currentIndex - 1);
    }
    if (option === "next") {
      if (currentIndex >= items.length - 1 && infinite) {
        return setCurrentIndex(0);
      }
      return setCurrentIndex(currentIndex + 1);
    }

    if (Number.isInteger(option)) {
      setCurrentIndex(option);
    }
  };

  const moveStartHandler = (event: React.MouseEvent) => {
    pressed = true;
    if (nodeInner) {
      nodeInner.style.transitionProperty = "none";
      startTemp = event.nativeEvent.screenX;
      startX = event.nativeEvent.screenX - nodeInner.offsetLeft;
    }
    if (nodeContainer) {
      nodeContainer.style.cursor = "grabbing";
    }
  };

  const touchStartHandler = (event: React.TouchEvent) => {
    console.log("touchStartHandler");
    console.log(event.touches);
    if (nodeInner) {
      nodeInner.style.transitionProperty = "none";
      startTemp = event.touches[0].screenX;
      startX = event.touches[0].screenX - nodeInner.offsetLeft;
    }
  };

  const moveHandler = (event: React.MouseEvent) => {
    if (!pressed) return;
    event.preventDefault();

    x = event.nativeEvent.screenX;

    if (nodeInner) {
      nodeInner.style.left = `${x - startX}px`;
    }
    checkBoundary();
  };

  const touchMoveHandler = (event: React.TouchEvent) => {
    x = event.touches[0].screenX;

    if (nodeInner) {
      nodeInner.style.left = `${x - startX}px`;
    }
    checkBoundary();
  };

  const moveEndHandler = (event: React.MouseEvent) => {
    if (nodeContainer) {
      nodeContainer.style.cursor = "grab";
    }

    if (nodeInner) {
      endX = event.nativeEvent.screenX;
      if (endX > startTemp) {
        moveSlide("prev");
      }
      if (endX < startTemp) {
        moveSlide("next");
      }
    }

    pressed = false;
  };

  const touchEndHandler = (event: React.TouchEvent) => {
    console.log("touchEndHandler");
    console.log(event);
    if (nodeInner) {
      if (x > startTemp) {
        moveSlide("prev");
      }
      if (x < startTemp) {
        moveSlide("next");
      }
    }
  };

  const checkBoundary = () => {
    if (nodeInner && nodeContainer) {
      let outer = nodeContainer.getBoundingClientRect();
      let inner = nodeInner.getBoundingClientRect();

      if (parseInt(nodeInner.style.left) > 0) {
        nodeInner.style.left = "0px";
      }

      if (inner.right < outer.right) {
        nodeInner.style.left = `-${inner.width - outer.width}px`;
      }
    }
  };

  useEffect(() => {
    wCarouselItem = elemContainer.current
      ? elemContainer.current.offsetWidth
      : 0;
    createSlides(wCarouselItem.toString());
  }, [elemContainer.current?.offsetWidth, size.width]);

  useEffect(() => {
    if (nodeInner) {
      nodeInner.style.left = `-${currentIndex * 100}%`;
    }
  }, [currentIndex]);

  return (
    <div className='carousel'>
      <div className='carousel-wrapper'>
        {showControls && (
          <div className='carousel-button carousel-button-prev'>
            <button onClick={() => moveSlide("prev")}>{"<"}</button>
          </div>
        )}
        {mobile ? (
          <div
            ref={elemContainer}
            className='carousel-container'
            onTouchStart={touchStartHandler}
            onTouchMove={touchMoveHandler}
            onTouchEnd={touchEndHandler}>
            <div ref={elemInner} className='carousel-inner'>
              {slides}
            </div>
          </div>
        ) : (
          <div
            ref={elemContainer}
            className='carousel-container'
            onMouseDown={moveStartHandler}
            onMouseMove={moveHandler}
            onMouseUp={moveEndHandler}>
            <div ref={elemInner} className='carousel-inner'>
              {slides}
            </div>
          </div>
        )}
        {showControls && (
          <div className='carousel-button carousel-button-next'>
            <button onClick={() => moveSlide("next")}>{">"}</button>
          </div>
        )}
      </div>
      {showIndicators && (
        <CarouselIndicators
          items={items}
          currentIndicator={currentIndex}
          changeCallback={(indicator) => moveSlide(indicator)}
        />
      )}
    </div>
  );
};
