import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import H4 from "./h4";

const Brand = () => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src="/logo.svg" />
        <AvatarFallback>Flint</AvatarFallback>
      </Avatar>
      <H4>Flint</H4>
    </div>
  );
};

export default Brand;
