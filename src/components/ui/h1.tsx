import WithChildren from "@/types/WithChildren.interface";
import React from "react";

const H1: React.FC<WithChildren> = ({ children }) => {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
};

export default H1;
