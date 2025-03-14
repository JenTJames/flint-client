import Geography from "@/types/dto/Geography";

export default interface GeographyFormProps {
  geographies: Geography[];
  addGeography: (geography: Geography) => void;
}
