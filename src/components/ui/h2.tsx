import WithChildren from "@/types/WithChildren.interface";
import React from "react";

const H2: React.FC<WithChildren> = ({ children }) => {
  return (
    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
};

export default H2;
