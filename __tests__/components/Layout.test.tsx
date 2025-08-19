import { render, screen } from "@testing-library/react";
import Layout from "../../src/components/Layout";
import "@testing-library/jest-dom";
import React from "react";

describe("Header Component", () => {
  it("should render the Layout Parent wrapper component", () => {
    render(
      <Layout>
        <div>This is a Layout</div>
      </Layout>
    );

    const parentWrapper = screen.getByTestId("layout-test-id");
    expect(parentWrapper).toBeInTheDocument();
  });

  it("should render the Layout children wrapper component", () => {
    render(
      <Layout>
        <div>This is a Layout</div>
      </Layout>
    );

    const childrenWrapper = screen.getByTestId(
      "children-wrapper-layout-test-id"
    );
    expect(childrenWrapper).toBeInTheDocument();
  });

  it("should render the Header component", () => {
    render(
      <Layout>
        <div>This is a Layout</div>
      </Layout>
    );

    const header = screen.getByTestId("brand-logo-test-id");
    expect(header).toBeInTheDocument();
  });
});
