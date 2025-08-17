import { type ReactNode } from "react";
import Header from "./Header";

type TPageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: TPageLayoutProps) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="p-12">{children}</div>
    </div>
  );
};

export default PageLayout;
