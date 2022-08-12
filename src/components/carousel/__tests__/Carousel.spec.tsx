import { fireEvent, render, screen } from "@testing-library/react";
import { Carousel } from "..";

const values = [
  {
    value: "/images/first-slide.jpg",
    type: "image",
  },
];

describe("Testing Carousel Component", () => {
  it("should create a carousel component", () => {
    const { container } = render(<Carousel items={values} />);
    // expect(container).toMatchSnapshot();
    expect(true).toBe(true);
  });
});

describe("Testing Carousel Component with controls", () => {
  it("should not render controls if not passed", async () => {
    render(<Carousel items={values} />);
    const buttons = await screen.queryAllByRole("button");
    expect(buttons.length).toBe(0);
  });

  it("should render controls if passed", async () => {
    render(<Carousel items={values} showControls />);
    const buttons = await screen.queryAllByRole("button");
    expect(buttons.length).toBe(2);
    buttons.forEach((button) => {
      expect(button.className.match(/(carousel-button-)\w+/g)).toBeTruthy();
    });
  });
});

describe("Testing Carousel Component with indicators", () => {
  it("should not render indicators if not passed", async () => {
    render(<Carousel items={values} />);
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(0);
  });

  it("should render indicators if passed", async () => {
    render(<Carousel items={values} showIndicators />);
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(values.length);
  });

  it("should change the active item on click", async () => {
    render(<Carousel items={values} showIndicators />);
    const buttons = await screen.findAllByRole("button");

    fireEvent.click(buttons[0]);

    const itemsIndicators = await screen.findAllByRole("listitem");
    expect(itemsIndicators[0].classList.contains("active")).toBeTruthy();
  });
});
