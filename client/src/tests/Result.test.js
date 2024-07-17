import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Result from "../components/Result";

describe("Result component", () => {
  test("renders a list of countries", () => {
    const countries = ["USA", "Canada", "Mexico"];
    render(<Result countries={countries} />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(countries.length);

    countries.forEach((country) => {
      const listItem = screen.getByText(country);
      expect(listItem).toBeInTheDocument();
    });
  });

  test("renders no countries when empty array is provided", () => {
    render(<Result countries={[]} />);

    const listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(0);
  });

  test("renders a single country", () => {
    const countries = ["Brazil"];
    render(<Result countries={countries} />);

    const listItem = screen.getByText("Brazil");
    expect(listItem).toBeInTheDocument();
  });

  test("renders correctly with special characters in country names", () => {
    const countries = ["South Korea", "Côte d'Ivoire"];
    render(<Result countries={countries} />);

    const listItem1 = screen.getByText("South Korea");
    expect(listItem1).toBeInTheDocument();

    const listItem2 = screen.getByText("Côte d'Ivoire");
    expect(listItem2).toBeInTheDocument();
  });
});
