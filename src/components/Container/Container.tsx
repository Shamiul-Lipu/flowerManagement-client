import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[2520px] mx-auto px-2 md:px-10 lg:px-20">
      {children}
    </div>
  );
};

export default Container;
