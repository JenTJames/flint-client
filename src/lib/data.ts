import Option from "@/types/Option.interface";

export const regions: Option[] = [
  { value: "1", label: "Africa" },
  { value: "2", label: "Antarctica" },
  { value: "3", label: "Asia" },
  { value: "4", label: "Europe" },
  { value: "5", label: "North America" },
  { value: "6", label: "Oceania" },
  { value: "7", label: "South America" },
] as const;

export const countries = [
  // Africa
  { value: "1", label: "Algeria", continentId: "1" },
  { value: "2", label: "Egypt", continentId: "1" },
  { value: "3", label: "Ethiopia", continentId: "1" },
  { value: "4", label: "Kenya", continentId: "1" },
  { value: "5", label: "Nigeria", continentId: "1" },
  { value: "6", label: "South Africa", continentId: "1" },

  // Antarctica (No major countries, but keeping it for structure)
  { value: "7", label: "Antarctica", continentId: "2" },

  // Asia
  { value: "8", label: "China", continentId: "3" },
  { value: "9", label: "India", continentId: "3" },
  { value: "10", label: "Indonesia", continentId: "3" },
  { value: "11", label: "Iran", continentId: "3" },
  { value: "12", label: "Israel", continentId: "3" },
  { value: "13", label: "Japan", continentId: "3" },
  { value: "14", label: "Pakistan", continentId: "3" },
  { value: "15", label: "Philippines", continentId: "3" },
  { value: "16", label: "Saudi Arabia", continentId: "3" },
  { value: "17", label: "South Korea", continentId: "3" },
  { value: "18", label: "Thailand", continentId: "3" },
  { value: "19", label: "Turkey", continentId: "3" },
  { value: "20", label: "Vietnam", continentId: "3" },

  // Europe
  { value: "21", label: "France", continentId: "4" },
  { value: "22", label: "Germany", continentId: "4" },
  { value: "23", label: "Italy", continentId: "4" },
  { value: "24", label: "Netherlands", continentId: "4" },
  { value: "25", label: "Poland", continentId: "4" },
  { value: "26", label: "Russia", continentId: "4" },
  { value: "27", label: "Spain", continentId: "4" },
  { value: "28", label: "Sweden", continentId: "4" },
  { value: "29", label: "Switzerland", continentId: "4" },
  { value: "30", label: "United Kingdom", continentId: "4" },

  // North America
  { value: "31", label: "Canada", continentId: "5" },
  { value: "32", label: "Cuba", continentId: "5" },
  { value: "33", label: "Mexico", continentId: "5" },
  { value: "34", label: "United States", continentId: "5" },

  // Oceania
  { value: "35", label: "Australia", continentId: "6" },
  { value: "36", label: "Fiji", continentId: "6" },
  { value: "37", label: "New Zealand", continentId: "6" },
  { value: "38", label: "Papua New Guinea", continentId: "6" },

  // South America
  { value: "39", label: "Argentina", continentId: "7" },
  { value: "40", label: "Brazil", continentId: "7" },
  { value: "41", label: "Chile", continentId: "7" },
  { value: "42", label: "Colombia", continentId: "7" },
  { value: "43", label: "Peru", continentId: "7" },
  { value: "44", label: "Venezuela", continentId: "7" },
] as const;
