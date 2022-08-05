import { render, screen } from "@testing-library/react";

import CarouselIndicators from "..";

const itemsImage = [
  { value: "https://picsum.photos/id/236/500/300", type: "image" },
  { value: "https://picsum.photos/id/237/500/300", type: "image" },
  { value: "https://picsum.photos/id/238/500/300", type: "image" },
  { value: "https://picsum.photos/id/239/500/300", type: "image" },
];

describe("Testing CarouselIndicators", () => {
  it("should render the component correctly", () => {
    render(
      <CarouselIndicators
        currentIndicator={1}
        items={itemsImage}
        changeCallback={() => {
          console.log("test");
        }}
      />
    );

    itemsImage.forEach((item, index) => {
      expect(screen.getByText(`${index}`)).toBeInTheDocument();
    });
  });

  it("should render the active item correctly", async () => {
    render(
      <CarouselIndicators
        currentIndicator={1}
        items={itemsImage}
        changeCallback={(item) => {
          console.log({ item });
        }}
      />
    );

    const items = await screen.findAllByRole("listitem");
    expect(items).toHaveLength(itemsImage.length);

    expect(items[1]).toHaveClass("active");
  });
});
