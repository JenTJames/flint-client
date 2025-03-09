import WithChildren from "@/types/WithChildren.interface";
import React from "react";

const Text: React.FC<WithChildren> = ({ children }) => {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
};

export default Text;
