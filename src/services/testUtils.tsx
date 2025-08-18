import React, { type ReactElement, type ReactNode } from "react";
import { Provider } from "react-redux";
import { render, type RenderOptions } from "@testing-library/react";
import appStore from "../store/appStore";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <Provider store={appStore}>{children}</Provider>
);

const renderWithProvider = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Wrapper, ...options });

export * from "@testing-library/react";
export { renderWithProvider };
