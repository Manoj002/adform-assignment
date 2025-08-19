import React, { type ReactNode } from "react";
import Header from "./Header";

type TPageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: TPageLayoutProps) => {
  return (
    <div data-testid="layout-test-id" className="flex flex-col">
      <Header />
      <div
        data-testid="children-wrapper-layout-test-id"
        className="px-12 py-10"
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
