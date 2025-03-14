import Option from "@/types/Option.interface";

export const findOptionByValue = (id: string, options: readonly Option[]) =>
  options.find((option) => option.value === id);
