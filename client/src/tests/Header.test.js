import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../components/Header";

describe("Header component", () => {
  test("renders the heading", () => {
    render(<Header />);
    const headingElement = screen.getByText(/Country search!!!/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("renders the image with correct src", () => {
    render(<Header />);
    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute(
      "src",
      `${process.env.PUBLIC_URL}world-image.jpg`
    );
  });

  test("renders the description paragraph", () => {
    render(<Header />);
    const paragraphElement = screen.getByText(
      /This React application lets you search through the countries below/i
    );
    expect(paragraphElement).toBeInTheDocument();
  });
});
