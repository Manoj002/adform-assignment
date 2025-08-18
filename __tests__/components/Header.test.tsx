import { render, screen } from "@testing-library/react";
import Header from "../../src/components/Header";
import "@testing-library/jest-dom";
import React from "react";

describe("Header Component", () => {
  it("should render the Header component", () => {
    render(<Header />);

    const logo = screen.getByTestId("brand-logo-test-id");
    expect(logo).toBeInTheDocument();
  });
});
