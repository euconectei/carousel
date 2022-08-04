import React from "react";
import { Carousel } from "./components/carousel";

function App() {
  const itemsImage = [
    { value: "https://picsum.photos/id/236/500/300", type: "image" },
    { value: "https://picsum.photos/id/237/500/300", type: "image" },
    { value: "https://picsum.photos/id/238/500/300", type: "image" },
    { value: "https://picsum.photos/id/239/500/300", type: "image" },
  ];

  return <Carousel items={itemsImage} infinite showControls showIndicators />;
}

export default App;
