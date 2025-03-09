import WithChildren from "@/types/WithChildren.interface";
import React from "react";

const H3: React.FC<WithChildren> = ({ children }) => {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
};

export default H3;
