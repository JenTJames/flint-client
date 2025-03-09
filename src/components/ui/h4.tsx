import WithChildren from "@/types/WithChildren.interface";
import React from "react";

const H4: React.FC<WithChildren> = ({ children }) => {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
};

export default H4;
