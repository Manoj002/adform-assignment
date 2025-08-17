import { type ReactNode } from "react";
import Header from "./Header";

type TPageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: TPageLayoutProps) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="px-12 py-10">{children}</div>
    </div>
  );
};

export default PageLayout;
