import GeographyForm from "@/components/geography-form";
import GeographyTable from "@/components/tables/geography-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import H2 from "@/components/ui/h2";
import RootLayout from "@/layouts/root-layout";
import Geography from "@/types/dto/Geography";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const geographyList: Geography[] = [
  {
    id: 1,
    country: "India",
    region: "Asia",
  },
  {
    id: 2,
    country: "Japan",
    region: "Asia",
  },
];

const GeographiesPage = () => {
  const [geographies, setGeographies] = useState<Geography[]>(geographyList);
  const [showGeographyForm, setShowGeographyForm] = useState<boolean>(false);

  const addGeographyToList = (geography: Geography) => {
    setGeographies((currentState) => [...currentState, geography]);
    setShowGeographyForm(false);
  };

  return (
    <RootLayout>
      <div className="min-h-[100vh] flex-1 flex flex-col gap-5 rounded-xl bg-muted/50 md:min-h-min p-5">
        <div className="flex justify-between items-center">
          <H2>Geographies</H2>
          <Dialog open={showGeographyForm} onOpenChange={setShowGeographyForm}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon /> Add New Geography
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[445px]">
              <DialogTitle>Add New Geography</DialogTitle>
              <DialogDescription>
                Geography will later be used to associate customers with
                specific locations for better organization and management.
              </DialogDescription>
              <GeographyForm
                geographies={geographyList}
                addGeography={addGeographyToList}
              />
            </DialogContent>
          </Dialog>
        </div>
        <GeographyTable data={geographies} />
      </div>
    </RootLayout>
  );
};

export default GeographiesPage;
