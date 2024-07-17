import Search from "../components/Search"; // assuming your Search component is in Search.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios"); // Mocking axios module

describe("Search component", () => {
  test("renders Search component", () => {
    render(<Search />);
    const headingElement = screen.getByText("Search"); // Look for text "Search" case insensitive
    expect(headingElement).toBeInTheDocument();
  });

  test("allows user to type in input", () => {
    render(<Search />);
    const inputElement = screen.getByRole("textbox");
    userEvent.type(inputElement, "Canada");
    expect(inputElement).toHaveValue("Canada");
  });

  test("fetches and displays data on button click", async () => {
    const mockSetCountries = jest.fn(); // Mock setCountries function
    const props = { setCountries: mockSetCountries };

    const mockResponse = {
      data: [
        { name: "Canada", population: 37664517 },
        { name: "USA", population: 328239523 },
      ],
    };

    axios.get.mockResolvedValueOnce(mockResponse); // Pass the entire mockResponse object

    render(<Search {...props} />);

    const inputElement = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    userEvent.type(inputElement, "Canada");
    userEvent.click(submitButton);

    // Assert that setCountries was called with the correct data
    await waitFor(() => {
      expect(mockSetCountries).toHaveBeenCalledWith(mockResponse.data);
    });
  });
});
