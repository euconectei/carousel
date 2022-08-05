import { render, screen } from "@testing-library/react";
import { CarouselItemImage } from "../CarouselItemImage";

const itemsImage = [
  { value: "https://picsum.photos/id/236/500/300", type: "image" },
  { value: "https://picsum.photos/id/237/500/300", type: "image" },
  { value: "https://picsum.photos/id/238/500/300", type: "image" },
  { value: "https://picsum.photos/id/239/500/300", type: "image" },
];

describe("CarouselItemImage test", () => {
  it("should render the component correctly", () => {
    render(<CarouselItemImage value={itemsImage[0].value} />);

    expect(screen.findByText(itemsImage[0].value)).toBeTruthy();
  });

  it("should render alt if passed", () => {
    render(<CarouselItemImage value={itemsImage[0].value} alt='alt image' />);

    const component = screen.getByRole("img");
    expect(component).toHaveAttribute("src", itemsImage[0].value);
    expect(component).toHaveAttribute("alt", "alt image");
  });
});
